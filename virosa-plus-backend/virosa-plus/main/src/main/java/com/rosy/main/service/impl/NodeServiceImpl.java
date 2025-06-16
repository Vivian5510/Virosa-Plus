package com.rosy.main.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.enums.StatusEnum;
import com.rosy.common.exception.ServiceException;
import com.rosy.common.utils.QueryWrapperUtil;
import com.rosy.main.domain.Article;
import com.rosy.main.domain.Node;
import com.rosy.common.enums.NodeType;
import com.rosy.main.mapper.NodeMapper;
import com.rosy.main.service.IArticleService;
import com.rosy.main.service.INodeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * <p>
 * 节点 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Service
public class NodeServiceImpl extends ServiceImpl<NodeMapper, Node> implements INodeService {

    @Resource
    private IArticleService articleService;

    @Override
    public Wrapper<Node> getQueryWrapper(Node node) {
        if (node == null) {
            throw new ServiceException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Node> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addEqualCondition(queryWrapper, node.getId(), Node::getId);
        QueryWrapperUtil.addLikeCondition(queryWrapper, node.getName(), Node::getName);
        QueryWrapperUtil.addEqualCondition(queryWrapper, node.getType(), Node::getType);
        QueryWrapperUtil.addEqualCondition(queryWrapper, node.getParentId(), Node::getParentId);
        QueryWrapperUtil.addEqualCondition(queryWrapper, node.getArticleId(), Node::getArticleId);
        QueryWrapperUtil.addEqualCondition(queryWrapper, node.getStatus(), Node::getStatus);

        return queryWrapper;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long addArticleToDirectory(Long articleId, Long directoryNodeId, String nodeName) {
        // 1. 检查文章是否存在
        Article article = articleService.getById(articleId);
        if (article == null) {
            throw new ServiceException(ErrorCode.NOT_FOUND_ERROR, "文章不存在");
        }

        // 2. 检查目录节点是否存在且为目录类型
        Node directoryNode = this.getById(directoryNodeId);
        if (directoryNode == null) {
            throw new ServiceException(ErrorCode.NOT_FOUND_ERROR, "目录节点不存在");
        }

        if (!NodeType.DIRECTORY.getCode().equals(directoryNode.getType())) {
            throw new ServiceException(ErrorCode.PARAMS_ERROR, "指定节点不是目录类型");
        }

        // 3. 检查文章是否已经在此目录下
        LambdaQueryWrapper<Node> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Node::getParentId, directoryNodeId)
                .eq(Node::getArticleId, articleId)
                .eq(Node::getType, NodeType.FILE.getCode());

        long count = this.count(queryWrapper);
        if (count > 0) {
            throw new ServiceException(ErrorCode.OPERATION_ERROR, "文章已存在于该目录中");
        }

        // 4. 创建新的文件节点
        Node fileNode = new Node();
        fileNode.setType(NodeType.FILE.getCode());
        fileNode.setParentId(directoryNodeId);
        fileNode.setArticleId(articleId);
        fileNode.setStatus(StatusEnum.ENABLED.getCode()); // 默认启用

        // 如果未指定节点名称，则使用文章标题
        if (StringUtils.hasText(nodeName)) {
            fileNode.setName(nodeName);
        } else {
            fileNode.setName(article.getTitle());
        }

        // 5. 保存节点
        boolean result = this.save(fileNode);
        if (!result) {
            throw new ServiceException(ErrorCode.OPERATION_ERROR, "添加文章到目录失败");
        }

        return fileNode.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean removeArticleFromDirectory(Long nodeId) {
        // 1. 检查节点是否存在
        Node node = this.getById(nodeId);
        if (node == null) {
            throw new ServiceException(ErrorCode.NOT_FOUND_ERROR, "节点不存在");
        }

        // 2. 确保是文件类型的节点
        if (!NodeType.FILE.getCode().equals(node.getType())) {
            throw new ServiceException(ErrorCode.PARAMS_ERROR, "该节点不是文件类型");
        }

        // 3. 删除节点（Note: 这里只删除节点，不删除文章本身）
        return this.removeById(nodeId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean moveNode(Long nodeId, Long newParentId) {
        // 1. 检查节点是否存在
        Node node = this.getById(nodeId);
        if (node == null) {
            throw new ServiceException(ErrorCode.NOT_FOUND_ERROR, "节点不存在");
        }

        // 2. 检查目标父节点是否存在且为目录类型
        Node parentNode = this.getById(newParentId);
        if (parentNode == null) {
            throw new ServiceException(ErrorCode.NOT_FOUND_ERROR, "目标父节点不存在");
        }

        if (!NodeType.DIRECTORY.getCode().equals(parentNode.getType())) {
            throw new ServiceException(ErrorCode.PARAMS_ERROR, "目标节点不是目录类型");
        }

        // 3. 防止循环引用：确保新父节点不是当前节点或其子节点
        if (nodeId.equals(newParentId) || isChildNode(nodeId, newParentId)) {
            throw new ServiceException(ErrorCode.PARAMS_ERROR, "不能将节点移动到自身或其子节点下");
        }

        // 4. 更新节点的父节点ID
        node.setParentId(newParentId);
        return this.updateById(node);
    }

    /**
     * 判断potentialChildId是否是parentId的子节点（直接或间接）
     */
    private boolean isChildNode(Long parentId, Long potentialChildId) {
        // 查找potentialChildId节点的父节点
        Node childNode = this.getById(potentialChildId);
        if (childNode == null || childNode.getParentId() == null) {
            return false;
        }

        // 如果父节点就是parentId，则是子节点
        if (childNode.getParentId().equals(parentId)) {
            return true;
        }

        // 递归检查其父节点是否是parentId的子节点
        return isChildNode(parentId, childNode.getParentId());
    }

    @Override
    public List<Node> getFileTree() {
        // 查询所有节点
        List<Node> allNodes = this.list();

        // 创建一个 Map 用来存储每个节点的 id 和节点对象
        Map<Long, Node> nodeMap = allNodes.stream()
                .collect(Collectors.toMap(Node::getId, node -> node));

        // 获取根节点 (id = 1)
        Node rootNode = nodeMap.get(1L);
        if (rootNode == null) {
            throw new ServiceException(ErrorCode.NOT_FOUND_ERROR, "根节点（id=1）不存在");
        }

        // 构建树
        List<Node> rootNodeChildren = new ArrayList<>();
        addChildrenToNode(rootNode, nodeMap, rootNodeChildren);

        // 返回根节点列表
        List<Node> result = new ArrayList<>();
        result.add(rootNode);
        return result;
    }

    /**
     * 递归为节点添加子节点
     */
    private void addChildrenToNode(Node node, Map<Long, Node> nodeMap, List<Node> parentChildren) {
        // 获取当前节点的所有子节点
        List<Node> children = nodeMap.values().stream()
                .filter(n -> Objects.equals(n.getParentId(), node.getId()))
                .toList();

        if (!children.isEmpty()) {
            for (Node child : children) {
                // 递归添加子节点
                List<Node> childChildren = new ArrayList<>();
                addChildrenToNode(child, nodeMap, childChildren);
                child.setChildren(childChildren);
                parentChildren.add(child);
            }
        }
    }
}

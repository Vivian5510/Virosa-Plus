package com.rosy.web.controller.main;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.annotation.ValidateRequest;
import com.rosy.common.domain.entity.AjaxResult;
import com.rosy.common.domain.entity.IdRequest;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.PageUtils;
import com.rosy.common.utils.ThrowUtils;
import com.rosy.main.domain.dto.node.NodeAddRequest;
import com.rosy.main.domain.dto.node.NodeQueryRequest;
import com.rosy.main.domain.dto.node.NodeUpdateRequest;
import com.rosy.main.domain.entity.Node;
import com.rosy.main.domain.vo.NodeVO;
import com.rosy.main.service.INodeService;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * <p>
 * 节点 前端控制器
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@RestController
@RequestMapping("/node")
public class NodeController {
    @Resource
    private INodeService nodeService;

    // region 增删改查

    /**
     * 创建
     */
    @PostMapping("/add")
    @ValidateRequest
    public AjaxResult addNode(@RequestBody NodeAddRequest nodeAddRequest) {
        Node node = new Node();
        BeanUtils.copyProperties(nodeAddRequest, node);
        boolean result = nodeService.save(node);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(node.getId());
    }

    /**
     * 删除
     */
    @PostMapping("/delete")
    @ValidateRequest
    public AjaxResult deleteNode(@RequestBody IdRequest idRequest) {
        boolean result = nodeService.removeById(idRequest.getId());
        return AjaxResult.success(result);
    }

    /**
     * 更新
     */
    @PostMapping("/update")
    @ValidateRequest
    public AjaxResult updateNode(@RequestBody NodeUpdateRequest nodeUpdateRequest) {
        if (nodeUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Node node = BeanUtil.copyProperties(nodeUpdateRequest, Node.class);
        boolean result = nodeService.updateById(node);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(true);
    }

    /**
     * 根据 id 获取
     */
    @GetMapping("/get")
    @ValidateRequest
    public AjaxResult getNodeById(Long id) {
        Node node = nodeService.getById(id);
        ThrowUtils.throwIf(node == null, ErrorCode.NOT_FOUND_ERROR);
        return AjaxResult.success(node);
    }

    /**
     * 根据 id 获取包装类
     */
    @GetMapping("/get/vo")
    @ValidateRequest
    public AjaxResult getNodeVOById(Long id) {
        AjaxResult response = getNodeById(id);
        Node node = (Node) response.get(AjaxResult.DATA_TAG);
        return AjaxResult.success(nodeService.getNodeVO(node));
    }

    /**
     * 分页获取列表
     */
    @PostMapping("/list/page")
    @ValidateRequest
    public AjaxResult listNodeByPage(@RequestBody NodeQueryRequest nodeQueryRequest) {
        long current = nodeQueryRequest.getCurrent();
        long size = nodeQueryRequest.getPageSize();
        Page<Node> nodePage = nodeService.page(new Page<>(current, size), nodeService.getQueryWrapper(nodeQueryRequest));
        return AjaxResult.success(nodePage);
    }

    /**
     * 分页获取封装列表
     */
    @PostMapping("/list/page/vo")
    @ValidateRequest
    public AjaxResult listNodeVOByPage(@RequestBody NodeQueryRequest nodeQueryRequest) {
        long current = nodeQueryRequest.getCurrent();
        long size = nodeQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Node> nodePage = nodeService.page(new Page<>(current, size), nodeService.getQueryWrapper(nodeQueryRequest));
        Page<NodeVO> nodeVOPage = PageUtils.convert(nodePage, nodeService::getNodeVO);
        return AjaxResult.success(nodeVOPage);
    }

    // endregion

    // region 业务
    @PostMapping("/get/file/tree")
    @ValidateRequest
    public AjaxResult getFileTree() {
        // 查询所有节点
        List<Node> allNodes = nodeService.list();  // 这里假设你有一个方法可以获取所有节点

        // 创建一个 Map 用来存储每个节点的 id 和节点对象
        Map<Long, Node> nodeMap = allNodes.stream()
                .collect(Collectors.toMap(Node::getId, node -> node));

        // 获取根节点 (id = 1)
        Node rootNode = nodeMap.get(1L);
        if (rootNode == null) {
            throw new IllegalStateException("根节点（id=1）不存在");
        }

        // 构建树
        List<NodeVO> rootNodeChildren = new ArrayList<>();
        addChildrenToNode(rootNode, nodeMap, rootNodeChildren);

        // 将根节点的子节点放入根节点中
        NodeVO rootNodeVO = convertToNodeVO(rootNode);
        rootNodeVO.setChildren(rootNodeChildren);

        return AjaxResult.success(rootNodeVO);
    }

    /**
     * 递归为节点添加子节点
     */
    private void addChildrenToNode(Node node, Map<Long, Node> nodeMap, List<NodeVO> parentChildren) {
        // 获取当前节点的所有子节点
        List<Node> children = nodeMap.values().stream()
                .filter(n -> Objects.equals(n.getParentId(), node.getId()))
                .toList();

        if (!children.isEmpty()) {
            for (Node child : children) {
                // 递归添加子节点
                List<NodeVO> childChildren = new ArrayList<>();
                addChildrenToNode(child, nodeMap, childChildren);
                NodeVO childNodeVO = convertToNodeVO(child);
                if (!childChildren.isEmpty()) childNodeVO.setChildren(childChildren);
                parentChildren.add(childNodeVO);
            }
        }
    }

    /**
     * 使用 Hutool 的 BeanUtil 将 Node 转换为 NodeVO
     */
    private NodeVO convertToNodeVO(Node node) {
        NodeVO nodeVO = new NodeVO();
        BeanUtil.copyProperties(node, nodeVO);  // 自动复制属性
        return nodeVO;
    }
}

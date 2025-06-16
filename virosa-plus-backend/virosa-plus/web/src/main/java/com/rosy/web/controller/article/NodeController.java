package com.rosy.web.controller.article;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.annotation.ValidateRequest;
import com.rosy.common.domain.AjaxResult;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.PageUtils;
import com.rosy.common.utils.ThrowUtils;
import com.rosy.main.domain.Node;
import com.rosy.main.service.INodeService;
import com.rosy.web.controller.article.vo.req.NodeAddReqVO;
import com.rosy.web.controller.article.vo.req.NodeArticleReqVO;
import com.rosy.web.controller.article.vo.req.NodeQueryReqVO;
import com.rosy.web.controller.article.vo.req.NodeUpdateReqVO;
import com.rosy.web.controller.article.vo.resp.NodeRespVO;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
@RequestMapping("/nodes")
public class NodeController {
    @Resource
    private INodeService nodeService;

    /**
     * 创建节点
     */
    @PostMapping
    @ValidateRequest
    public AjaxResult createNode(@RequestBody NodeAddReqVO reqVO) {
        // 检查类型是否正确
        if (reqVO.getTitle() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "节点标题不能为空");
        }

        // 保存节点
        Node node = new Node();
        BeanUtils.copyProperties(reqVO, node);
        node.setType("directory"); // 强制设置为目录类型
        node.setName(reqVO.getTitle()); // 设置名称为标题

        boolean result = nodeService.save(node);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);

        return AjaxResult.success(node.getId());
    }

    /**
     * 删除节点
     */
    @DeleteMapping("/{id}")
    @ValidateRequest
    public AjaxResult deleteNode(@PathVariable("id") Long id) {
        boolean result = nodeService.removeById(id);
        return AjaxResult.success(result);
    }

    /**
     * 更新节点
     */
    @PutMapping("/{id}")
    @ValidateRequest
    public AjaxResult updateNode(@PathVariable("id") Long id, @RequestBody NodeUpdateReqVO reqVO) {
        // 确保ID匹配
        if (!id.equals(reqVO.getId())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "路径ID与请求体ID不一致");
        }

        // 更新节点
        Node node = new Node();
        BeanUtils.copyProperties(reqVO, node);
        node.setName(reqVO.getTitle()); // 设置名称为标题

        boolean result = nodeService.updateById(node);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);

        return AjaxResult.success(true);
    }

    /**
     * 根据ID获取节点详情
     */
    @GetMapping("/{id}")
    @ValidateRequest
    public AjaxResult getNodeById(@PathVariable("id") Long id) {
        Node node = nodeService.getById(id);
        ThrowUtils.throwIf(node == null, ErrorCode.NOT_FOUND_ERROR);

        // 转换为VO
        NodeRespVO respVO = new NodeRespVO();
        BeanUtils.copyProperties(node, respVO);
        respVO.setTitle(node.getName());

        return AjaxResult.success(respVO);
    }

    /**
     * 条件查询节点分页列表
     */
    @GetMapping
    @ValidateRequest
    public AjaxResult listNodes(NodeQueryReqVO reqVO) {
        // 限制爬虫
        ThrowUtils.throwIf(reqVO.getPageSize() > 20, ErrorCode.PARAMS_ERROR);

        // 查询条件转换
        Node queryNode = new Node();
        if (reqVO.getTitle() != null) {
            queryNode.setName(reqVO.getTitle());
        }
        queryNode.setParentId(reqVO.getParentId());
        queryNode.setArticleId(reqVO.getArticleId());

        // 查询数据
        Page<Node> nodePage = nodeService.page(
                new Page<>(reqVO.getPageNum(), reqVO.getPageSize()),
                nodeService.getQueryWrapper(queryNode));

        // 转换为VO
        Page<NodeRespVO> respVOPage = PageUtils.convert(nodePage, node -> {
            NodeRespVO respVO = new NodeRespVO();
            BeanUtils.copyProperties(node, respVO);
            respVO.setTitle(node.getName());
            return respVO;
        });

        return AjaxResult.success(respVOPage);
    }

    /**
     * 获取文件树结构
     */
    @GetMapping("/tree")
    @ValidateRequest
    public AjaxResult getFileTree() {
        // 获取文件树
        List<Node> nodeTree = nodeService.getFileTree();

        // 转换为VO
        List<NodeRespVO> respVOList = nodeTree.stream().map(node -> {
            NodeRespVO respVO = new NodeRespVO();
            BeanUtils.copyProperties(node, respVO);
            respVO.setTitle(node.getName());
            return respVO;
        }).collect(Collectors.toList());

        return AjaxResult.success(respVOList);
    }

    /**
     * 添加文章到目录
     */
    @PostMapping("/articles")
    @ValidateRequest
    public AjaxResult addArticleToDirectory(@RequestBody NodeArticleReqVO reqVO) {
        Long nodeId = nodeService.addArticleToDirectory(
                reqVO.getArticleId(),
                reqVO.getNodeId(),
                null); // 使用文章标题作为节点名称

        return AjaxResult.success(nodeId);
    }

    /**
     * 从目录移除文章
     */
    @DeleteMapping("/articles/{id}")
    @ValidateRequest
    public AjaxResult removeArticleFromDirectory(@PathVariable("id") Long id) {
        boolean result = nodeService.removeArticleFromDirectory(id);
        return AjaxResult.success(result);
    }

    /**
     * 移动节点到新目录
     */
    @PutMapping("/{id}/move")
    @ValidateRequest
    public AjaxResult moveNode(@PathVariable("id") Long id, @RequestBody NodeUpdateReqVO reqVO) {
        // 确保ID匹配
        if (!id.equals(reqVO.getId()) || reqVO.getParentId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "节点ID和父节点ID不能为空");
        }

        boolean result = nodeService.moveNode(id, reqVO.getParentId());
        return AjaxResult.success(result);
    }
}

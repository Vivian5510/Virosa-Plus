package com.rosy.web.controller.article;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.annotation.ValidateRequest;
import com.rosy.common.domain.AjaxResult;
import com.rosy.common.domain.PageResult;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.ServiceException;
import com.rosy.common.utils.ThrowUtils;
import com.rosy.main.domain.Node;
import com.rosy.main.service.INodeService;
import com.rosy.web.controller.article.vo.req.NodeAddReqVO;
import com.rosy.web.controller.article.vo.req.NodeQueryReqVO;
import com.rosy.web.controller.article.vo.req.NodeUpdateReqVO;
import com.rosy.web.controller.article.vo.resp.NodeRespVO;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 * 目录/文件节点 前端控制器
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
     * 获取节点分页列表
     */
    @GetMapping("/page")
    @ValidateRequest
    public AjaxResult page(NodeQueryReqVO reqVO) {
        // 构造查询条件
        Node node = new Node();
        BeanUtils.copyProperties(reqVO, node);

        // 分页查询
        Page<Node> page = new Page<>(reqVO.getPageNum(), reqVO.getPageSize());
        Page<Node> pageResult = nodeService.page(page, nodeService.getQueryWrapper(node));

        // 使用Hutool的BeanUtil直接转换列表
        List<NodeRespVO> voList = BeanUtil.copyToList(pageResult.getRecords(), NodeRespVO.class);

        // 直接构造PageResult返回
        PageResult<NodeRespVO> result = new PageResult<>(voList, pageResult.getTotal());
        return AjaxResult.success(result);
    }

    /**
     * 获取节点详情
     */
    @GetMapping("/{id}")
    public AjaxResult getInfo(@PathVariable Long id) {
        Node node = nodeService.getById(id);
        ThrowUtils.throwIf(node == null, ErrorCode.NOT_FOUND_ERROR, "节点不存在");

        NodeRespVO vo = BeanUtil.copyProperties(node, NodeRespVO.class);
        return AjaxResult.success(vo);
    }

    /**
     * 新增节点
     */
    @PostMapping
    @ValidateRequest
    public AjaxResult add(@RequestBody NodeAddReqVO reqVO) {
        Node node = new Node();
        BeanUtils.copyProperties(reqVO, node);

        boolean success = nodeService.save(node);
        ThrowUtils.throwIf(!success, ErrorCode.OPERATION_ERROR, "新增节点失败");

        return AjaxResult.success(node.getId());
    }

    /**
     * 修改节点
     */
    @PutMapping("/{id}")
    @ValidateRequest
    public AjaxResult update(@PathVariable Long id, @RequestBody NodeUpdateReqVO reqVO) {
        // 确保ID匹配
        if (!id.equals(reqVO.getId())) {
            throw new ServiceException(ErrorCode.PARAMS_ERROR, "路径ID与请求体ID不一致");
        }

        Node node = new Node();
        BeanUtils.copyProperties(reqVO, node);

        boolean success = nodeService.updateById(node);
        ThrowUtils.throwIf(!success, ErrorCode.OPERATION_ERROR, "修改节点失败");

        return AjaxResult.success();
    }

    /**
     * 删除节点
     */
    @DeleteMapping("/{id}")
    public AjaxResult remove(@PathVariable Long id) {
        boolean success = nodeService.removeById(id);
        ThrowUtils.throwIf(!success, ErrorCode.OPERATION_ERROR, "删除节点失败");

        return AjaxResult.success();
    }

    /**
     * 获取树形结构的节点列表
     */
    @GetMapping("/tree")
    public AjaxResult getFileTree() {
        List<Node> nodeTree = nodeService.getFileTree();

        // 使用Hutool的BeanUtil直接转换列表
        List<NodeRespVO> voList = BeanUtil.copyToList(nodeTree, NodeRespVO.class);

        return AjaxResult.success(voList);
    }

    /**
     * 将文章添加到目录
     */
    @PostMapping("/directory/{directoryId}/article/{articleId}")
    public AjaxResult addArticleToDirectory(
            @PathVariable Long directoryId,
            @PathVariable Long articleId,
            @RequestParam(required = false) String nodeName) {

        Long newNodeId = nodeService.addArticleToDirectory(articleId, directoryId, nodeName);
        ThrowUtils.throwIf(newNodeId == null, ErrorCode.OPERATION_ERROR, "添加文章到目录失败");

        return AjaxResult.success(newNodeId);
    }

    /**
     * 从目录中移除文章
     */
    @DeleteMapping("/file/{nodeId}")
    public AjaxResult removeArticleFromDirectory(@PathVariable Long nodeId) {
        boolean success = nodeService.removeArticleFromDirectory(nodeId);
        ThrowUtils.throwIf(!success, ErrorCode.OPERATION_ERROR, "从目录中移除文章失败");

        return AjaxResult.success();
    }

    /**
     * 移动节点到新的父目录
     */
    @PutMapping("/{nodeId}/parent/{newParentId}")
    public AjaxResult moveNode(@PathVariable Long nodeId, @PathVariable Long newParentId) {
        boolean success = nodeService.moveNode(nodeId, newParentId);
        ThrowUtils.throwIf(!success, ErrorCode.OPERATION_ERROR, "移动节点失败");

        return AjaxResult.success();
    }
}

package com.rosy.virosa.web.controller.article;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.virosa.common.domain.AjaxResult;
import com.rosy.virosa.common.domain.PageResult;
import com.rosy.virosa.common.exception.ErrorCode;
import com.rosy.virosa.common.exception.ServiceException;
import com.rosy.virosa.common.utils.ThrowUtils;
import com.rosy.virosa.support.domain.Node;
import com.rosy.virosa.support.service.INodeService;
import com.rosy.virosa.web.controller.article.vo.req.NodeAddReqVO;
import com.rosy.virosa.web.controller.article.vo.req.NodeQueryReqVO;
import com.rosy.virosa.web.controller.article.vo.req.NodeUpdateReqVO;
import com.rosy.virosa.web.controller.article.vo.resp.NodeRespVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
@Validated
@RequiredArgsConstructor
public class NodeController {

    private final INodeService nodeService;

    /**
     * 获取节点分页列表
     */
    @GetMapping("/page")
    public AjaxResult page(@Valid NodeQueryReqVO reqVO) {
        // 构造查询条件
        Node node = new Node();
        BeanUtils.copyProperties(reqVO, node);

        // 分页查询
        Page<Node> page = new Page<>(reqVO.getPageNum(), reqVO.getPageSize());
        Page<Node> pageResult = nodeService.page(page, nodeService.getQueryWrapper(node));

        // 转换为前端响应VO
        List<NodeRespVO> voList = pageResult.getRecords().stream()
                .map(this::convertToRespVO)
                .collect(Collectors.toList());

        // 构造PageResult返回
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

        NodeRespVO vo = convertToRespVO(node);
        return AjaxResult.success(vo);
    }

    /**
     * 新增节点
     */
    @PostMapping
    public AjaxResult add(@Valid @RequestBody NodeAddReqVO reqVO) {
        Node node = new Node();
        BeanUtils.copyProperties(reqVO, node);

        // 确保其他必要字段有默认值
        if (node.getStatus() == null) {
            node.setStatus(1); // 默认启用
        }

        boolean success = nodeService.save(node);
        ThrowUtils.throwIf(!success, ErrorCode.OPERATION_ERROR, "新增节点失败");

        return AjaxResult.success(node.getId());
    }

    /**
     * 修改节点
     */
    @PutMapping("/{id}")
    public AjaxResult update(@PathVariable Long id, @Valid @RequestBody NodeUpdateReqVO reqVO) {
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
        List<Node> nodeTree;
        try {
            nodeTree = nodeService.getFileTree();
        } catch (Exception e) {
            // 如果获取树失败，返回空列表而不是报错
            return AjaxResult.success(List.of());
        }

        // 转换为前端响应VO
        List<NodeRespVO> voList = nodeTree.stream()
                .map(this::convertToRespVO)
                .collect(Collectors.toList());

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

    /**
     * 转换Node实体为NodeRespVO
     */
    private NodeRespVO convertToRespVO(Node node) {
        if (node == null) {
            return null;
        }

        NodeRespVO vo = new NodeRespVO();
        BeanUtils.copyProperties(node, vo);

        // 处理children
        if (node.getChildren() != null && !node.getChildren().isEmpty()) {
            vo.setChildren(node.getChildren().stream()
                    .map(this::convertToRespVO)
                    .collect(Collectors.toList()));
        }

        return vo;
    }
}

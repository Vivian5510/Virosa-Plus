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
    public AjaxResult getNodeById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Node node = nodeService.getById(id);
        ThrowUtils.throwIf(node == null, ErrorCode.NOT_FOUND_ERROR);
        return AjaxResult.success(node);
    }

    /**
     * 根据 id 获取包装类
     */
    @GetMapping("/get/vo")
    public AjaxResult getNodeVOById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
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
}

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
import com.rosy.main.domain.dto.message.MessageAddRequest;
import com.rosy.main.domain.dto.message.MessageQueryRequest;
import com.rosy.main.domain.dto.message.MessageUpdateRequest;
import com.rosy.main.domain.entity.Message;
import com.rosy.main.domain.vo.MessageVO;
import com.rosy.main.service.IMessageService;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 留言 前端控制器
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@RestController
@RequestMapping("/message")
public class MessageController {
    @Resource
    private IMessageService messageService;

    // region 增删改查

    /**
     * 创建
     */
    @PostMapping("/add")
    @ValidateRequest
    public AjaxResult addMessage(@RequestBody MessageAddRequest messageAddRequest) {
        Message message = new Message();
        BeanUtils.copyProperties(messageAddRequest, message);
        boolean result = messageService.save(message);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(message.getId());
    }

    /**
     * 删除
     */
    @PostMapping("/delete")
    @ValidateRequest
    public AjaxResult deleteMessage(@RequestBody IdRequest idRequest) {
        boolean result = messageService.removeById(idRequest.getId());
        return AjaxResult.success(result);
    }

    /**
     * 更新
     */
    @PostMapping("/update")
    @ValidateRequest
    public AjaxResult updateMessage(@RequestBody MessageUpdateRequest messageUpdateRequest) {
        if (messageUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Message message = BeanUtil.copyProperties(messageUpdateRequest, Message.class);
        boolean result = messageService.updateById(message);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(true);
    }

    /**
     * 根据 id 获取
     */
    @GetMapping("/get")
    public AjaxResult getMessageById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Message message = messageService.getById(id);
        ThrowUtils.throwIf(message == null, ErrorCode.NOT_FOUND_ERROR);
        return AjaxResult.success(message);
    }

    /**
     * 根据 id 获取包装类
     */
    @GetMapping("/get/vo")
    public AjaxResult getMessageVOById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        AjaxResult response = getMessageById(id);
        Message message = (Message) response.get(AjaxResult.DATA_TAG);
        return AjaxResult.success(messageService.getMessageVO(message));
    }

    /**
     * 分页获取列表
     */
    @PostMapping("/list/page")
    @ValidateRequest
    public AjaxResult listMessageByPage(@RequestBody MessageQueryRequest messageQueryRequest) {
        long current = messageQueryRequest.getCurrent();
        long size = messageQueryRequest.getPageSize();
        Page<Message> messagePage = messageService.page(new Page<>(current, size), messageService.getQueryWrapper(messageQueryRequest));
        return AjaxResult.success(messagePage);
    }

    /**
     * 分页获取封装列表
     */
    @PostMapping("/list/page/vo")
    @ValidateRequest
    public AjaxResult listMessageVOByPage(@RequestBody MessageQueryRequest messageQueryRequest) {
        long current = messageQueryRequest.getCurrent();
        long size = messageQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Message> messagePage = messageService.page(new Page<>(current, size), messageService.getQueryWrapper(messageQueryRequest));
        Page<MessageVO> messageVOPage = PageUtils.convert(messagePage, messageService::getMessageVO);
        return AjaxResult.success(messageVOPage);
    }

    // endregion
}

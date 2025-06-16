package com.rosy.web.controller.message;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.annotation.ValidateRequest;
import com.rosy.common.domain.AjaxResult;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.PageUtils;
import com.rosy.common.utils.ThrowUtils;
import com.rosy.main.domain.Message;
import com.rosy.main.service.IMessageService;
import com.rosy.web.controller.message.vo.req.MessageAddReqVO;
import com.rosy.web.controller.message.vo.req.MessageQueryReqVO;
import com.rosy.web.controller.message.vo.req.MessageUpdateReqVO;
import com.rosy.web.controller.message.vo.resp.MessageRespVO;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * 留言 前端控制器
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@RestController
@RequestMapping("/messages")
public class MessageController {
    @Resource
    private IMessageService messageService;

    /**
     * 创建留言
     */
    @PostMapping
    @ValidateRequest
    public AjaxResult createMessage(@RequestBody MessageAddReqVO reqVO) {
        // 保存留言
        Message message = new Message();
        BeanUtils.copyProperties(reqVO, message);
        boolean result = messageService.save(message);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);

        return AjaxResult.success(message.getId());
    }

    /**
     * 删除留言
     */
    @DeleteMapping("/{id}")
    @ValidateRequest
    public AjaxResult deleteMessage(@PathVariable("id") Long id) {
        boolean result = messageService.removeById(id);
        return AjaxResult.success(result);
    }

    /**
     * 更新留言
     */
    @PutMapping("/{id}")
    @ValidateRequest
    public AjaxResult updateMessage(@PathVariable("id") Long id, @RequestBody MessageUpdateReqVO reqVO) {
        // 确保ID匹配
        if (!id.equals(reqVO.getId())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "路径ID与请求体ID不一致");
        }

        // 更新留言
        Message message = new Message();
        BeanUtils.copyProperties(reqVO, message);
        boolean result = messageService.updateById(message);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);

        return AjaxResult.success(true);
    }

    /**
     * 根据ID获取留言详情
     */
    @GetMapping("/{id}")
    @ValidateRequest
    public AjaxResult getMessageById(@PathVariable("id") Long id) {
        Message message = messageService.getById(id);
        ThrowUtils.throwIf(message == null, ErrorCode.NOT_FOUND_ERROR);

        // 转换为VO
        MessageRespVO respVO = new MessageRespVO();
        BeanUtils.copyProperties(message, respVO);

        return AjaxResult.success(respVO);
    }

    /**
     * 条件查询留言分页列表
     */
    @GetMapping
    @ValidateRequest
    public AjaxResult listMessages(MessageQueryReqVO reqVO) {
        // 限制爬虫
        ThrowUtils.throwIf(reqVO.getPageSize() > 20, ErrorCode.PARAMS_ERROR);

        // 查询条件转换
        Message queryMessage = new Message();
        BeanUtils.copyProperties(reqVO, queryMessage);

        // 查询数据
        Page<Message> messagePage = messageService.page(
                new Page<>(reqVO.getPageNum(), reqVO.getPageSize()),
                messageService.getQueryWrapper(queryMessage));

        // 转换为VO
        Page<MessageRespVO> respVOPage = PageUtils.convert(messagePage, message -> {
            MessageRespVO respVO = new MessageRespVO();
            BeanUtils.copyProperties(message, respVO);
            return respVO;
        });

        return AjaxResult.success(respVOPage);
    }

    /**
     * 获取全部留言列表
     */
    @GetMapping("/all")
    public AjaxResult getAllMessages() {
        List<Message> messages = messageService.list();

        // 转换为VO
        List<MessageRespVO> respVOList = messages.stream()
                .map(message -> {
                    MessageRespVO respVO = new MessageRespVO();
                    BeanUtils.copyProperties(message, respVO);
                    return respVO;
                })
                .collect(Collectors.toList());

        return AjaxResult.success(respVOList);
    }
}

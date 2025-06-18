package com.rosy.virosa.web.controller.message;

import cn.hutool.core.bean.BeanUtil;
import com.rosy.virosa.common.domain.AjaxResult;
import com.rosy.virosa.common.domain.PageResult;
import com.rosy.virosa.common.exception.ErrorCode;
import com.rosy.virosa.common.exception.ServiceException;
import com.rosy.virosa.common.utils.ThrowUtils;
import com.rosy.virosa.support.domain.Message;
import com.rosy.virosa.support.service.IMessageService;
import com.rosy.virosa.web.controller.message.vo.req.MessageAddReqVO;
import com.rosy.virosa.web.controller.message.vo.req.MessageQueryReqVO;
import com.rosy.virosa.web.controller.message.vo.req.MessageUpdateReqVO;
import com.rosy.virosa.web.controller.message.vo.resp.MessageRespVO;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
@Validated
@RequiredArgsConstructor
public class MessageController {

    private final IMessageService messageService;

    /**
     * 获取留言分页列表
     */
    @GetMapping("/page")
    public AjaxResult page(@Valid MessageQueryReqVO reqVO) {
        // 参数转换
        Message message = new Message();
        BeanUtils.copyProperties(reqVO, message);

        // 调用服务获取分页数据
        PageResult<Message> pageResult = messageService.getMessagePage(reqVO.getPageNum(), reqVO.getPageSize(),
                message);

        // 使用Hutool的BeanUtil进行转换
        List<MessageRespVO> voList = BeanUtil.copyToList(pageResult.getList(), MessageRespVO.class);

        // 返回结果
        return AjaxResult.success(new PageResult<>(voList, pageResult.getTotal()));
    }

    /**
     * 获取留言详情
     */
    @GetMapping("/{id}")
    public AjaxResult getInfo(@PathVariable Long id) {
        Message message = messageService.getById(id);
        ThrowUtils.throwIf(message == null, ErrorCode.NOT_FOUND_ERROR, "留言不存在");

        MessageRespVO vo = BeanUtil.copyProperties(message, MessageRespVO.class);
        return AjaxResult.success(vo);
    }

    /**
     * 新增留言
     */
    @PostMapping
    public AjaxResult add(@Valid @RequestBody MessageAddReqVO reqVO) {
        Message message = new Message();
        BeanUtils.copyProperties(reqVO, message);

        boolean success = messageService.save(message);
        ThrowUtils.throwIf(!success, ErrorCode.OPERATION_ERROR, "新增留言失败");

        return AjaxResult.success(message.getId());
    }

    /**
     * 修改留言
     */
    @PutMapping("/{id}")
    public AjaxResult update(@PathVariable Long id, @Valid @RequestBody MessageUpdateReqVO reqVO) {
        // 确保ID匹配
        if (!id.equals(reqVO.getId())) {
            throw new ServiceException(ErrorCode.PARAMS_ERROR, "路径ID与请求体ID不一致");
        }

        Message message = new Message();
        BeanUtils.copyProperties(reqVO, message);

        boolean success = messageService.updateById(message);
        ThrowUtils.throwIf(!success, ErrorCode.OPERATION_ERROR, "修改留言失败");

        return AjaxResult.success();
    }

    /**
     * 删除留言
     */
    @DeleteMapping("/{id}")
    public AjaxResult remove(@PathVariable Long id) {
        boolean success = messageService.removeById(id);
        ThrowUtils.throwIf(!success, ErrorCode.OPERATION_ERROR, "删除留言失败");

        return AjaxResult.success();
    }
}

package com.rosy.main.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.QueryWrapperUtil;
import com.rosy.main.domain.dto.message.MessageQueryRequest;
import com.rosy.main.domain.entity.Message;
import com.rosy.main.domain.entity.Message;
import com.rosy.main.domain.vo.MessageVO;
import com.rosy.main.mapper.MessageMapper;
import com.rosy.main.service.IMessageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 留言 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Service
public class MessageServiceImpl extends ServiceImpl<MessageMapper, Message> implements IMessageService {
    @Override
    public MessageVO getMessageVO(Message message) {
        if (message == null) {
            return null;
        }
        return BeanUtil.copyProperties(message, MessageVO.class);
    }

    @Override
    public Wrapper<Message> getQueryWrapper(MessageQueryRequest messageQueryRequest) {
        if (messageQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Message> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addCondition(queryWrapper, messageQueryRequest.getId(), Message::getId);
        QueryWrapperUtil.addCondition(queryWrapper, messageQueryRequest.getContent(), Message::getContent);
        QueryWrapperUtil.addCondition(queryWrapper, messageQueryRequest.getCreateTime(), Message::getCreateTime);

        // 添加排序条件
        QueryWrapperUtil.addSortCondition(queryWrapper,
                messageQueryRequest.getSortField(),
                messageQueryRequest.getSortOrder(),
                Message::getId);

        return queryWrapper;
    }
}

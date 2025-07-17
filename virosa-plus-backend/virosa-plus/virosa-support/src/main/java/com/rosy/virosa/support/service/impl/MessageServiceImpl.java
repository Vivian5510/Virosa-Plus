package com.rosy.virosa.support.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rosy.virosa.common.domain.PageResult;
import com.rosy.virosa.common.exception.ErrorCode;
import com.rosy.virosa.common.exception.ServiceException;
import com.rosy.virosa.common.utils.QueryWrapperUtil;
import com.rosy.virosa.support.domain.Message;
import com.rosy.virosa.support.mapper.MessageMapper;
import com.rosy.virosa.support.service.IMessageService;
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
    public Wrapper<Message> getQueryWrapper(Message message) {
        if (message == null) {
            throw new ServiceException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Message> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addEqualCondition(queryWrapper, message.getId(), Message::getId);
        QueryWrapperUtil.addEqualCondition(queryWrapper, message.getContent(), Message::getContent);
        QueryWrapperUtil.addEqualCondition(queryWrapper, message.getCreateTime(), Message::getCreateTime);
        QueryWrapperUtil.addEqualCondition(queryWrapper, message.getUpdateTime(), Message::getUpdateTime);

        return queryWrapper;
    }

    @Override
    public PageResult<Message> getMessagePage(long pageNum, long pageSize, Message message) {
        // 构建查询条件
        Wrapper<Message> wrapper = getQueryWrapper(message);

        // 执行分页查询
        Page<Message> page = page(new Page<>(pageNum, pageSize), wrapper);

        // 直接构造PageResult，不使用PageUtils
        return new PageResult<>(page.getRecords(), page.getTotal());
    }
}

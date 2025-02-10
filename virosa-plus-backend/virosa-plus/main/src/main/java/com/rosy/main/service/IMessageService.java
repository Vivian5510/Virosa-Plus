package com.rosy.main.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.rosy.main.domain.dto.message.MessageQueryRequest;
import com.rosy.main.domain.entity.Message;
import com.rosy.main.domain.entity.Message;
import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.main.domain.vo.MessageVO;

import java.util.List;

/**
 * <p>
 * 留言 服务类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
public interface IMessageService extends IService<Message> {
    MessageVO getMessageVO(Message message);

    Wrapper<Message> getQueryWrapper(MessageQueryRequest messageQueryRequest);

    List<MessageVO> getMessageVOs(List<Message> messages);
}

package com.rosy.main.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.domain.PageResult;
import com.rosy.main.domain.Message;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 留言 服务类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
public interface IMessageService extends IService<Message> {

    /**
     * 获取查询包装器
     *
     * @param message 查询条件
     * @return 查询包装器
     */
    Wrapper<Message> getQueryWrapper(Message message);

    /**
     * 分页查询留言
     * 
     * @param pageNum  页码
     * @param pageSize 每页数量
     * @param message  查询条件
     * @return 留言分页结果
     */
    PageResult<Message> getMessagePage(long pageNum, long pageSize, Message message);
}

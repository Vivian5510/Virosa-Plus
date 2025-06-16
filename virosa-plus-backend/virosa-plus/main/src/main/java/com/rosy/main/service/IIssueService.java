package com.rosy.main.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.domain.PageResult;
import com.rosy.main.domain.Issue;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 问题 服务类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
public interface IIssueService extends IService<Issue> {
    /**
     * 获取查询包装器
     * 
     * @param issue 查询条件
     * @return 查询包装器
     */
    Wrapper<Issue> getQueryWrapper(Issue issue);

    /**
     * 分页查询问题
     * 
     * @param pageNum  页码
     * @param pageSize 每页数量
     * @param issue    查询条件
     * @return 问题分页结果
     */
    PageResult<Issue> getIssuePage(long pageNum, long pageSize, Issue issue);
}

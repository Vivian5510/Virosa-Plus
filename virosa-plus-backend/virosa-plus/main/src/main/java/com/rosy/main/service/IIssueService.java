package com.rosy.main.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.rosy.main.domain.dto.issue.IssueQueryRequest;
import com.rosy.main.domain.entity.Issue;
import com.rosy.main.domain.entity.Issue;
import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.main.domain.vo.IssueVO;

/**
 * <p>
 * 问题 服务类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
public interface IIssueService extends IService<Issue> {
    IssueVO getIssueVO(Issue issue);

    Wrapper<Issue> getQueryWrapper(IssueQueryRequest issueQueryRequest);
}

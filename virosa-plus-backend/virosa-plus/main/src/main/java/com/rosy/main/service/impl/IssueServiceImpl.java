package com.rosy.main.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.ServiceException;
import com.rosy.common.utils.QueryWrapperUtil;
import com.rosy.main.domain.Issue;
import com.rosy.main.mapper.IssueMapper;
import com.rosy.main.service.IIssueService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 问题 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Service
public class IssueServiceImpl extends ServiceImpl<IssueMapper, Issue> implements IIssueService {

    @Override
    public Wrapper<Issue> getQueryWrapper(Issue issue) {
        if (issue == null) {
            throw new ServiceException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Issue> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addCondition(queryWrapper, issue.getId(), Issue::getId);
        QueryWrapperUtil.addCondition(queryWrapper, issue.getTitle(), Issue::getTitle);
        QueryWrapperUtil.addCondition(queryWrapper, issue.getDescription(), Issue::getDescription);
        QueryWrapperUtil.addCondition(queryWrapper, issue.getStatus(), Issue::getStatus);
        QueryWrapperUtil.addCondition(queryWrapper, issue.getType(), Issue::getType);
        QueryWrapperUtil.addCondition(queryWrapper, issue.getTags(), Issue::getTags);
        QueryWrapperUtil.addCondition(queryWrapper, issue.getCreateTime(), Issue::getCreateTime);
        QueryWrapperUtil.addCondition(queryWrapper, issue.getUpdateTime(), Issue::getUpdateTime);

        return queryWrapper;
    }
}

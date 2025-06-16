package com.rosy.main.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.domain.PageResult;
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
        QueryWrapperUtil.addEqualCondition(queryWrapper, issue.getId(), Issue::getId);
        QueryWrapperUtil.addEqualCondition(queryWrapper, issue.getTitle(), Issue::getTitle);
        QueryWrapperUtil.addEqualCondition(queryWrapper, issue.getDescription(), Issue::getDescription);
        QueryWrapperUtil.addEqualCondition(queryWrapper, issue.getStatus(), Issue::getStatus);
        QueryWrapperUtil.addEqualCondition(queryWrapper, issue.getType(), Issue::getType);
        QueryWrapperUtil.addEqualCondition(queryWrapper, issue.getTags(), Issue::getTags);
        QueryWrapperUtil.addEqualCondition(queryWrapper, issue.getCreateTime(), Issue::getCreateTime);
        QueryWrapperUtil.addEqualCondition(queryWrapper, issue.getUpdateTime(), Issue::getUpdateTime);

        return queryWrapper;
    }

    @Override
    public PageResult<Issue> getIssuePage(long pageNum, long pageSize, Issue issue) {
        // 构建查询条件
        Wrapper<Issue> wrapper = getQueryWrapper(issue);

        // 执行分页查询
        Page<Issue> page = page(new Page<>(pageNum, pageSize), wrapper);

        // 直接构造PageResult，不使用PageUtils
        return new PageResult<>(page.getRecords(), page.getTotal());
    }
}

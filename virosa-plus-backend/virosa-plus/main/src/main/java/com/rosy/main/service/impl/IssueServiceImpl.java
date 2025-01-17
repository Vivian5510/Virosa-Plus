package com.rosy.main.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.QueryWrapperUtil;
import com.rosy.main.domain.dto.issue.IssueQueryRequest;
import com.rosy.main.domain.entity.Issue;
import com.rosy.main.domain.entity.Issue;
import com.rosy.main.domain.vo.IssueVO;
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
    public IssueVO getIssueVO(Issue issue) {
        if (issue == null) {
            return null;
        }
        return BeanUtil.copyProperties(issue, IssueVO.class);
    }

    @Override
    public Wrapper<Issue> getQueryWrapper(IssueQueryRequest issueQueryRequest) {
        if (issueQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Issue> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addCondition(queryWrapper, issueQueryRequest.getId(), Issue::getId);
        QueryWrapperUtil.addCondition(queryWrapper, issueQueryRequest.getTitle(), Issue::getTitle);
        QueryWrapperUtil.addCondition(queryWrapper, issueQueryRequest.getType(), Issue::getType);
        QueryWrapperUtil.addCondition(queryWrapper, issueQueryRequest.getDescription(), Issue::getDescription);
        QueryWrapperUtil.addCondition(queryWrapper, issueQueryRequest.getStatus(), Issue::getStatus);
        QueryWrapperUtil.addCondition(queryWrapper, issueQueryRequest.getNickname(), Issue::getNickname);
        QueryWrapperUtil.addCondition(queryWrapper, issueQueryRequest.getEmail(), Issue::getEmail);
        QueryWrapperUtil.addCondition(queryWrapper, issueQueryRequest.getCreateTime(), Issue::getCreateTime);
        QueryWrapperUtil.addCondition(queryWrapper, issueQueryRequest.getUpdateTime(), Issue::getUpdateTime);

        // 添加排序条件
        QueryWrapperUtil.addSortCondition(queryWrapper,
                issueQueryRequest.getSortField(),
                issueQueryRequest.getSortOrder(),
                Issue::getId);

        return queryWrapper;
    }
}

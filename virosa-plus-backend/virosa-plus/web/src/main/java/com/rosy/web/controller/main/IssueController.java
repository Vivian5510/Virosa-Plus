package com.rosy.web.controller.main;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.annotation.ValidateRequest;
import com.rosy.common.domain.entity.AjaxResult;
import com.rosy.common.domain.entity.IdRequest;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.PageUtils;
import com.rosy.common.utils.ThrowUtils;
import com.rosy.main.domain.dto.issue.IssueAddRequest;
import com.rosy.main.domain.dto.issue.IssueQueryRequest;
import com.rosy.main.domain.dto.issue.IssueUpdateRequest;
import com.rosy.main.domain.entity.Issue;
import com.rosy.main.domain.vo.IssueVO;
import com.rosy.main.service.IIssueService;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 问题 前端控制器
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@RestController
@RequestMapping("/issue")
public class IssueController {
    @Resource
    private IIssueService issueService;

    // region 增删改查

    /**
     * 创建
     */
    @PostMapping("/add")
    @ValidateRequest
    public AjaxResult addIssue(@RequestBody IssueAddRequest issueAddRequest) {
        Issue issue = new Issue();
        BeanUtils.copyProperties(issueAddRequest, issue);
        boolean result = issueService.save(issue);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(issue.getId());
    }

    /**
     * 删除
     */
    @PostMapping("/delete")
    @ValidateRequest
    public AjaxResult deleteIssue(@RequestBody IdRequest idRequest) {
        boolean result = issueService.removeById(idRequest.getId());
        return AjaxResult.success(result);
    }

    /**
     * 更新
     */
    @PostMapping("/update")
    @ValidateRequest
    public AjaxResult updateIssue(@RequestBody IssueUpdateRequest issueUpdateRequest) {
        if (issueUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Issue issue = BeanUtil.copyProperties(issueUpdateRequest, Issue.class);
        boolean result = issueService.updateById(issue);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(true);
    }

    /**
     * 根据 id 获取
     */
    @GetMapping("/get")
    @ValidateRequest
    public AjaxResult getIssueById(Long id) {
        Issue issue = issueService.getById(id);
        ThrowUtils.throwIf(issue == null, ErrorCode.NOT_FOUND_ERROR);
        return AjaxResult.success(issue);
    }

    /**
     * 根据 id 获取包装类
     */
    @GetMapping("/get/vo")
    @ValidateRequest
    public AjaxResult getIssueVOById(Long id) {
        AjaxResult response = getIssueById(id);
        Issue issue = (Issue) response.get(AjaxResult.DATA_TAG);
        return AjaxResult.success(issueService.getIssueVO(issue));
    }

    /**
     * 分页获取列表
     */
    @PostMapping("/list/page")
    @ValidateRequest
    public AjaxResult listIssueByPage(@RequestBody IssueQueryRequest issueQueryRequest) {
        long current = issueQueryRequest.getCurrent();
        long size = issueQueryRequest.getPageSize();
        Page<Issue> issuePage = issueService.page(new Page<>(current, size), issueService.getQueryWrapper(issueQueryRequest));
        return AjaxResult.success(issuePage);
    }

    /**
     * 分页获取封装列表
     */
    @PostMapping("/list/page/vo")
    @ValidateRequest
    public AjaxResult listIssueVOByPage(@RequestBody IssueQueryRequest issueQueryRequest) {
        long current = issueQueryRequest.getCurrent();
        long size = issueQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Issue> issuePage = issueService.page(new Page<>(current, size), issueService.getQueryWrapper(issueQueryRequest));
        Page<IssueVO> issueVOPage = PageUtils.convert(issuePage, issueService::getIssueVO);
        return AjaxResult.success(issueVOPage);
    }

    // endregion
}

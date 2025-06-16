package com.rosy.web.controller.issue;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.annotation.ValidateRequest;
import com.rosy.common.domain.AjaxResult;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.PageUtils;
import com.rosy.common.utils.ThrowUtils;
import com.rosy.main.domain.Issue;
import com.rosy.main.service.IIssueService;
import com.rosy.web.controller.issue.vo.req.IssueAddReqVO;
import com.rosy.web.controller.issue.vo.req.IssueQueryReqVO;
import com.rosy.web.controller.issue.vo.req.IssueUpdateReqVO;
import com.rosy.web.controller.issue.vo.resp.IssueRespVO;
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
@RequestMapping("/issues")
public class IssueController {
    @Resource
    private IIssueService issueService;

    /**
     * 创建问题
     */
    @PostMapping
    @ValidateRequest
    public AjaxResult createIssue(@RequestBody IssueAddReqVO reqVO) {
        // 保存问题
        Issue issue = new Issue();
        BeanUtils.copyProperties(reqVO, issue);
        boolean result = issueService.save(issue);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);

        return AjaxResult.success(issue.getId());
    }

    /**
     * 删除问题
     */
    @DeleteMapping("/{id}")
    @ValidateRequest
    public AjaxResult deleteIssue(@PathVariable("id") Long id) {
        boolean result = issueService.removeById(id);
        return AjaxResult.success(result);
    }

    /**
     * 更新问题
     */
    @PutMapping("/{id}")
    @ValidateRequest
    public AjaxResult updateIssue(@PathVariable("id") Long id, @RequestBody IssueUpdateReqVO reqVO) {
        // 确保ID匹配
        if (!id.equals(reqVO.getId())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "路径ID与请求体ID不一致");
        }

        // 更新问题
        Issue issue = new Issue();
        BeanUtils.copyProperties(reqVO, issue);
        boolean result = issueService.updateById(issue);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);

        return AjaxResult.success(true);
    }

    /**
     * 根据ID获取问题详情
     */
    @GetMapping("/{id}")
    @ValidateRequest
    public AjaxResult getIssueById(@PathVariable("id") Long id) {
        Issue issue = issueService.getById(id);
        ThrowUtils.throwIf(issue == null, ErrorCode.NOT_FOUND_ERROR);

        // 转换为VO
        IssueRespVO respVO = new IssueRespVO();
        BeanUtils.copyProperties(issue, respVO);

        return AjaxResult.success(respVO);
    }

    /**
     * 条件查询问题分页列表
     */
    @GetMapping
    @ValidateRequest
    public AjaxResult listIssues(IssueQueryReqVO reqVO) {
        // 限制爬虫
        ThrowUtils.throwIf(reqVO.getPageSize() > 20, ErrorCode.PARAMS_ERROR);

        // 查询条件转换
        Issue queryIssue = new Issue();
        BeanUtils.copyProperties(reqVO, queryIssue);

        // 查询数据
        Page<Issue> issuePage = issueService.page(
                new Page<>(reqVO.getPageNum(), reqVO.getPageSize()),
                issueService.getQueryWrapper(queryIssue));

        // 转换为VO
        Page<IssueRespVO> respVOPage = PageUtils.convert(issuePage, issue -> {
            IssueRespVO respVO = new IssueRespVO();
            BeanUtils.copyProperties(issue, respVO);
            return respVO;
        });

        return AjaxResult.success(respVOPage);
    }
}

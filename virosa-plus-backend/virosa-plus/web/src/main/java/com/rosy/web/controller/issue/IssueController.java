package com.rosy.web.controller.issue;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.annotation.ValidateRequest;
import com.rosy.common.domain.AjaxResult;
import com.rosy.common.domain.PageResult;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.ServiceException;
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

import java.util.List;

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
     * 获取问题分页列表
     */
    @GetMapping("/page")
    @ValidateRequest
    public AjaxResult page(IssueQueryReqVO reqVO) {
        // 参数转换
        Issue issue = new Issue();
        BeanUtils.copyProperties(reqVO, issue);

        // 调用服务获取分页数据
        PageResult<Issue> pageResult = issueService.getIssuePage(reqVO.getPageNum(), reqVO.getPageSize(), issue);

        // 使用Hutool的BeanUtil进行转换
        List<IssueRespVO> voList = BeanUtil.copyToList(pageResult.getList(), IssueRespVO.class);

        // 返回结果
        return AjaxResult.success(new PageResult<>(voList, pageResult.getTotal()));
    }

    /**
     * 获取问题详情
     */
    @GetMapping("/{id}")
    public AjaxResult getInfo(@PathVariable Long id) {
        Issue issue = issueService.getById(id);
        ThrowUtils.throwIf(issue == null, ErrorCode.NOT_FOUND_ERROR, "问题不存在");

        IssueRespVO vo = BeanUtil.copyProperties(issue, IssueRespVO.class);
        return AjaxResult.success(vo);
    }

    /**
     * 新增问题
     */
    @PostMapping
    @ValidateRequest
    public AjaxResult add(@RequestBody IssueAddReqVO reqVO) {
        Issue issue = new Issue();
        BeanUtils.copyProperties(reqVO, issue);

        boolean success = issueService.save(issue);
        ThrowUtils.throwIf(!success, ErrorCode.OPERATION_ERROR, "新增问题失败");

        return AjaxResult.success(issue.getId());
    }

    /**
     * 修改问题
     */
    @PutMapping("/{id}")
    @ValidateRequest
    public AjaxResult update(@PathVariable Long id, @RequestBody IssueUpdateReqVO reqVO) {
        // 确保ID匹配
        if (!id.equals(reqVO.getId())) {
            throw new ServiceException(ErrorCode.PARAMS_ERROR, "路径ID与请求体ID不一致");
        }

        Issue issue = new Issue();
        BeanUtils.copyProperties(reqVO, issue);

        boolean success = issueService.updateById(issue);
        ThrowUtils.throwIf(!success, ErrorCode.OPERATION_ERROR, "修改问题失败");

        return AjaxResult.success();
    }

    /**
     * 删除问题
     */
    @DeleteMapping("/{id}")
    public AjaxResult remove(@PathVariable Long id) {
        boolean success = issueService.removeById(id);
        ThrowUtils.throwIf(!success, ErrorCode.OPERATION_ERROR, "删除问题失败");

        return AjaxResult.success();
    }
}

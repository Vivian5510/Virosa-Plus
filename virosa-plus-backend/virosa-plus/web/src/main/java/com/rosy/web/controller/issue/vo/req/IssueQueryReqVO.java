package com.rosy.web.controller.issue.vo.req;

import com.rosy.common.domain.PageParam;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 问题查询请求对象
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class IssueQueryReqVO extends PageParam {

    /**
     * 问题标题，模糊匹配
     */
    private String title;

    /**
     * 处理状态（0-待处理，1-处理中，2-已解决，3-无法解决）
     */
    private Integer status;

    /**
     * 问题类型（0-功能建议，1-故障报修）
     */
    private Integer type;
}
package com.rosy.web.controller.issue.vo.req;

import lombok.Data;

/**
 * 问题更新请求对象
 */
@Data
public class IssueUpdateReqVO {

    /**
     * ID
     */
    private Long id;

    /**
     * 问题标题
     */
    private String title;

    /**
     * 问题描述
     */
    private String description;

    /**
     * 标签，多个以逗号分隔
     */
    private String tags;

    /**
     * 状态（0-未解决，1-已解决）
     */
    private Integer status;

    /**
     * 问题类型（0-功能建议，1-故障报修）
     */
    private Integer type;
}
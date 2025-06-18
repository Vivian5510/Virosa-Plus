package com.rosy.virosa.web.controller.issue.vo.resp;

import lombok.Data;

/**
 * 问题表(Issue)表响应视图对象
 */
@Data
public class IssueRespVO {

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
     * 处理状态（0-待处理，1-处理中，2-已解决，3-无法解决）
     */
    private Integer status;

    /**
     * 问题类型（0-功能建议，1-故障报修）
     */
    private Integer type;

    /**
     * 标签
     */
    private String tags;
}
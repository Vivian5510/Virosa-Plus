package com.rosy.virosa.web.controller.issue.vo.req;

import lombok.Data;

import java.io.Serializable;

/**
 * 问题新增请求对象
 */
@Data
public class IssueAddReqVO implements Serializable {

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
     * 问题类型（0-功能建议，1-故障报修）
     */
    private Integer type;
}
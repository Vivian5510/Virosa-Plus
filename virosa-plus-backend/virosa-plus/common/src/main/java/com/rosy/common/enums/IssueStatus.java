package com.rosy.common.enums;

import lombok.Getter;

/**
 * 问题状态枚举
 */
@Getter
public enum IssueStatus {

    /**
     * 打开状态
     */
    OPEN(0, "待处理"),

    /**
     * 处理中
     */
    IN_PROGRESS(1, "处理中"),

    /**
     * 已解决
     */
    RESOLVED(2, "已解决"),

    /**
     * 已关闭
     */
    CLOSED(3, "已关闭");

    private final Integer code;
    private final String description;

    IssueStatus(Integer code, String description) {
        this.code = code;
        this.description = description;
    }
}
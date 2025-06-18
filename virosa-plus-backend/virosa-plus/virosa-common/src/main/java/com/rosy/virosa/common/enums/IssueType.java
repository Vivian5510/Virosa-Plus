package com.rosy.virosa.common.enums;

import lombok.Getter;

/**
 * 问题类型枚举
 */
@Getter
public enum IssueType {

    /**
     * 缺陷
     */
    BUG("BUG", "缺陷"),

    /**
     * 功能需求
     */
    FEATURE("FEATURE", "功能需求"),

    /**
     * 其他
     */
    OTHER("OTHER", "其他");

    private final String code;
    private final String description;

    IssueType(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
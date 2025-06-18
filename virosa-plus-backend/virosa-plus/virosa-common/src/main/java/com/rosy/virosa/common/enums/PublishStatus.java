package com.rosy.virosa.common.enums;

import lombok.Getter;

/**
 * 发布状态枚举
 */
@Getter
public enum PublishStatus {

    /**
     * 草稿状态
     */
    DRAFT(0, "草稿"),

    /**
     * 已发布状态
     */
    PUBLISHED(1, "已发布");

    private final Integer code;
    private final String description;

    PublishStatus(Integer code, String description) {
        this.code = code;
        this.description = description;
    }
}
package com.rosy.common.enums;

import lombok.Getter;

/**
 * 状态枚举
 */
@Getter
public enum StatusEnum {

    /**
     * 禁用状态
     */
    DISABLED(0, "禁用"),

    /**
     * 启用状态
     */
    ENABLED(1, "启用");

    private final Integer code;
    private final String description;

    StatusEnum(Integer code, String description) {
        this.code = code;
        this.description = description;
    }
}
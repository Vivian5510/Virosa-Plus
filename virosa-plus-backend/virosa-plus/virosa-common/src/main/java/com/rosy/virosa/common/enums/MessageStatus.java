package com.rosy.virosa.common.enums;

import lombok.Getter;

/**
 * 消息状态枚举
 */
@Getter
public enum MessageStatus {

    /**
     * 未读状态
     */
    UNREAD(0, "未读"),

    /**
     * 已读状态
     */
    READ(1, "已读");

    private final Integer code;
    private final String description;

    MessageStatus(Integer code, String description) {
        this.code = code;
        this.description = description;
    }
}
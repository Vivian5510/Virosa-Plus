package com.rosy.common.enums;

import lombok.Getter;

/**
 * 消息类型枚举
 */
@Getter
public enum MessageType {

    /**
     * 公告通知
     */
    NOTICE(0, "公告通知"),

    /**
     * 提醒
     */
    REMINDER(1, "提醒");

    private final Integer code;
    private final String description;

    MessageType(Integer code, String description) {
        this.code = code;
        this.description = description;
    }
}
package com.rosy.common.enums;

import lombok.Getter;

/**
 * 节点类型枚举
 */
@Getter
public enum NodeType {

    /**
     * 目录类型
     */
    DIRECTORY("directory", "目录"),

    /**
     * 文件类型
     */
    FILE("file", "文件");

    private final String code;
    private final String description;

    NodeType(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
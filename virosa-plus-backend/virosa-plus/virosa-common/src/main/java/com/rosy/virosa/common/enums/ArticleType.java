package com.rosy.virosa.common.enums;

import lombok.Getter;

/**
 * 文章类型枚举
 */
@Getter
public enum ArticleType {

    /**
     * 随笔
     */
    ESSAY("ESSAY", "随笔"),

    /**
     * 技术文章
     */
    TECH("TECH", "技术"),

    /**
     * 生活
     */
    LIFE("LIFE", "生活"),

    /**
     * 书评
     */
    BOOK_REVIEW("BOOK_REVIEW", "书评"),

    /**
     * 影评
     */
    MOVIE_REVIEW("MOVIE_REVIEW", "影评"),

    /**
     * 乐评
     */
    MUSIC_REVIEW("MUSIC_REVIEW", "乐评"),

    /**
     * 名人评传
     */
    CELEBRITY("CELEBRITY", "名人评传");

    private final String code;
    private final String description;

    ArticleType(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
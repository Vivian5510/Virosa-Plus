package com.rosy.virosa.web.controller.article.vo.req;

import lombok.Data;

import java.io.Serializable;

/**
 * 文章新增请求对象
 */
@Data
public class ArticleAddReqVO implements Serializable {

    /**
     * 文章标题
     */
    private String title;

    /**
     * 文章内容
     */
    private String content;

    /**
     * 文章封面图片
     */
    private String coverImage;

    /**
     * 文章作者
     */
    private String author;

    /**
     * 文章分类
     */
    private String category;

    /**
     * 文章标签，多个以逗号分隔
     */
    private String tags;
} 
package com.rosy.virosa.web.controller.article.vo.resp;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 文章表(Article)表响应视图对象
 */
@Data
public class ArticleRespVO implements Serializable {

    private Long id;

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

    /**
     * 类型: 随笔/技术/生活/书评/影评/乐评/名人评传
     */
    private String type;

    /**
     * 额外信息 (如音乐的专辑名、书的出版社等)
     */
    private String extraInfo;

    /**
     * 外部链接 (如音乐链接、视频链接等)
     */
    private String externalLink;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 是否已发布（0: 草稿, 1: 已发布）
     */
    private Byte isPublished;
}
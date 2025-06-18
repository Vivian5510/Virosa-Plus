package com.rosy.virosa.web.controller.article.vo.req;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 文章新增请求VO
 */
@Data
public class ArticleAddVO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 标题
     */
    private String title;

    /**
     * 封面
     */
    private String cover;

    /**
     * 类型: 随笔/技术/生活/书评/影评/乐评/名人评传
     */
    private String type;

    /**
     * 作者/艺术家 (适用于书评/乐评等)
     */
    private String author;

    /**
     * 额外信息 (如音乐的专辑名、书的出版社等)
     */
    private String extraInfo;

    /**
     * 外部链接 (如音乐链接、视频链接等)
     */
    private String externalLink;

    /**
     * 内容
     */
    private String content;

    /**
     * 是否已发布（0: 草稿, 1: 已发布）
     */
    private Byte isPublished;
}
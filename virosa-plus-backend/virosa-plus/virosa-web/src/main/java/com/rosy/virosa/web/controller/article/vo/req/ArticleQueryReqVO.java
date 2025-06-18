package com.rosy.virosa.web.controller.article.vo.req;

import com.rosy.virosa.common.domain.PageParam;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 文章查询请求对象
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class ArticleQueryReqVO extends PageParam {

    /**
     * 文章标题，模糊匹配
     */
    private String title;

    /**
     * 文章分类
     */
    private String category;

    /**
     * 文章标签，模糊匹配
     */
    private String tags;

    /**
     * 作者
     */
    private String author;
}
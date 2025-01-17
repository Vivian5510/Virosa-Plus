package com.rosy.main.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.rosy.main.domain.dto.article.ArticleQueryRequest;
import com.rosy.main.domain.entity.Article;
import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.main.domain.vo.ArticleVO;

/**
 * <p>
 * 文章 服务类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
public interface IArticleService extends IService<Article> {

    ArticleVO getArticleVO(Article article);

    Wrapper<Article> getQueryWrapper(ArticleQueryRequest articleQueryRequest);
}

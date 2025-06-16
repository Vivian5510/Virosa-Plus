package com.rosy.main.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.rosy.main.domain.Article;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 文章 服务类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
public interface IArticleService extends IService<Article> {

    Wrapper<Article> getQueryWrapper(Article article);
}

package com.rosy.main.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.domain.PageResult;
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

    /**
     * 获取查询条件包装器
     * 
     * @param article 查询条件
     * @return 查询包装器
     */
    Wrapper<Article> getQueryWrapper(Article article);

    /**
     * 分页查询文章
     * 
     * @param pageNum  页码
     * @param pageSize 每页数量
     * @param article  查询条件
     * @return 文章分页结果
     */
    PageResult<Article> getArticlePage(long pageNum, long pageSize, Article article);
}

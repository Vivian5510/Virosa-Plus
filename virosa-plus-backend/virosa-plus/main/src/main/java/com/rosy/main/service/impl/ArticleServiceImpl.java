package com.rosy.main.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.ServiceException;
import com.rosy.common.utils.QueryWrapperUtil;
import com.rosy.main.domain.Article;
import com.rosy.main.mapper.ArticleMapper;
import com.rosy.main.service.IArticleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 文章 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements IArticleService {

    @Override
    public Wrapper<Article> getQueryWrapper(Article article) {
        if (article == null) {
            throw new ServiceException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addCondition(queryWrapper, article.getId(), Article::getId);
        QueryWrapperUtil.addCondition(queryWrapper, article.getTitle(), Article::getTitle);
        QueryWrapperUtil.addCondition(queryWrapper, article.getType(), Article::getType);
        QueryWrapperUtil.addCondition(queryWrapper, article.getAuthor(), Article::getAuthor);
        QueryWrapperUtil.addCondition(queryWrapper, article.getContent(), Article::getContent);
        QueryWrapperUtil.addCondition(queryWrapper, article.getIsPublished(), Article::getIsPublished);
        QueryWrapperUtil.addCondition(queryWrapper, article.getCreateTime(), Article::getCreateTime);
        QueryWrapperUtil.addCondition(queryWrapper, article.getUpdateTime(), Article::getUpdateTime);

        return queryWrapper;
    }
}

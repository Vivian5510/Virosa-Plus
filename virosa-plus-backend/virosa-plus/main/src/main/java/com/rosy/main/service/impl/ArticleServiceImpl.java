package com.rosy.main.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.domain.PageResult;
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
        QueryWrapperUtil.addEqualCondition(queryWrapper, article.getId(), Article::getId);
        QueryWrapperUtil.addEqualCondition(queryWrapper, article.getTitle(), Article::getTitle);
        QueryWrapperUtil.addEqualCondition(queryWrapper, article.getType(), Article::getType);
        QueryWrapperUtil.addEqualCondition(queryWrapper, article.getAuthor(), Article::getAuthor);
        QueryWrapperUtil.addEqualCondition(queryWrapper, article.getCover(), Article::getCover);
        QueryWrapperUtil.addEqualCondition(queryWrapper, article.getExtraInfo(), Article::getExtraInfo);
        QueryWrapperUtil.addEqualCondition(queryWrapper, article.getExternalLink(), Article::getExternalLink);
        QueryWrapperUtil.addEqualCondition(queryWrapper, article.getContent(), Article::getContent);
        QueryWrapperUtil.addEqualCondition(queryWrapper, article.getIsPublished(), Article::getIsPublished);
        QueryWrapperUtil.addEqualCondition(queryWrapper, article.getCreateTime(), Article::getCreateTime);
        QueryWrapperUtil.addEqualCondition(queryWrapper, article.getUpdateTime(), Article::getUpdateTime);

        return queryWrapper;
    }

    @Override
    public PageResult<Article> getArticlePage(long pageNum, long pageSize, Article article) {
        // 构建查询条件
        Wrapper<Article> wrapper = getQueryWrapper(article);

        // 执行分页查询
        Page<Article> page = page(new Page<>(pageNum, pageSize), wrapper);

        // 直接构造PageResult，不使用PageUtils
        return new PageResult<>(page.getRecords(), page.getTotal());
    }
}

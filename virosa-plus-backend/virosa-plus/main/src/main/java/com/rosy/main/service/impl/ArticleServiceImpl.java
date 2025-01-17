package com.rosy.main.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.QueryWrapperUtil;
import com.rosy.main.domain.dto.article.ArticleQueryRequest;
import com.rosy.main.domain.entity.Article;
import com.rosy.main.domain.vo.ArticleVO;
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
    public ArticleVO getArticleVO(Article article) {
        if (article == null) {
            return null;
        }
        return BeanUtil.copyProperties(article, ArticleVO.class);
    }

    @Override
    public Wrapper<Article> getQueryWrapper(ArticleQueryRequest articleQueryRequest) {
        if (articleQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addCondition(queryWrapper, articleQueryRequest.getId(), Article::getId);
        QueryWrapperUtil.addCondition(queryWrapper, articleQueryRequest.getTitle(), Article::getTitle);
        QueryWrapperUtil.addCondition(queryWrapper, articleQueryRequest.getType(), Article::getType);
        QueryWrapperUtil.addCondition(queryWrapper, articleQueryRequest.getContent(), Article::getContent);
        QueryWrapperUtil.addCondition(queryWrapper, articleQueryRequest.getIsPublished(), Article::getIsPublished);
        QueryWrapperUtil.addCondition(queryWrapper, articleQueryRequest.getCreateTime(), Article::getCreateTime);
        QueryWrapperUtil.addCondition(queryWrapper, articleQueryRequest.getUpdateTime(), Article::getUpdateTime);

        // 添加排序条件
        QueryWrapperUtil.addSortCondition(queryWrapper,
                articleQueryRequest.getSortField(),
                articleQueryRequest.getSortOrder(),
                Article::getId);

        return queryWrapper;
    }

}

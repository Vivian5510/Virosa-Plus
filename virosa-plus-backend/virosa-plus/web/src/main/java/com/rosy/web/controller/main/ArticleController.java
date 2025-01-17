package com.rosy.web.controller.main;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.annotation.ValidateRequest;
import com.rosy.common.domain.entity.AjaxResult;
import com.rosy.common.domain.entity.IdRequest;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.PageUtils;
import com.rosy.common.utils.ThrowUtils;
import com.rosy.main.domain.dto.article.ArticleAddRequest;
import com.rosy.main.domain.dto.article.ArticleQueryRequest;
import com.rosy.main.domain.dto.article.ArticleUpdateRequest;
import com.rosy.main.domain.entity.Article;
import com.rosy.main.domain.vo.ArticleVO;
import com.rosy.main.service.IArticleService;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 文章 前端控制器
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@RestController
@RequestMapping("/article")
public class ArticleController {

    @Resource
    private IArticleService articleService;

    // region 增删改查

    /**
     * 创建用户
     */
    @PostMapping("/add")
    @ValidateRequest
    public AjaxResult addArticle(@RequestBody ArticleAddRequest articleAddRequest) {
        Article article = new Article();
        BeanUtils.copyProperties(articleAddRequest, article);
        boolean result = articleService.save(article);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(article.getId());
    }

    /**
     * 删除
     */
    @PostMapping("/delete")
    @ValidateRequest
    public AjaxResult deleteArticle(@RequestBody IdRequest idRequest) {
        boolean result = articleService.removeById(idRequest.getId());
        return AjaxResult.success(result);
    }

    /**
     * 更新
     */
    @PostMapping("/update")
    @ValidateRequest
    public AjaxResult updateArticle(@RequestBody ArticleUpdateRequest articleUpdateRequest) {
        if (articleUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Article article = BeanUtil.copyProperties(articleUpdateRequest, Article.class);
        boolean result = articleService.updateById(article);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(true);
    }

    /**
     * 根据 id 获取
     */
    @GetMapping("/get")
    public AjaxResult getArticleById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Article article = articleService.getById(id);
        ThrowUtils.throwIf(article == null, ErrorCode.NOT_FOUND_ERROR);
        return AjaxResult.success(article);
    }

    /**
     * 根据 id 获取包装类
     */
    @GetMapping("/get/vo")
    public AjaxResult getArticleVOById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        AjaxResult response = getArticleById(id);
        Article article = (Article) response.get(AjaxResult.DATA_TAG);
        return AjaxResult.success(articleService.getArticleVO(article));
    }

    /**
     * 分页获取列表
     */
    @PostMapping("/list/page")
    @ValidateRequest
    public AjaxResult listArticleByPage(@RequestBody ArticleQueryRequest articleQueryRequest) {
        long current = articleQueryRequest.getCurrent();
        long size = articleQueryRequest.getPageSize();
        Page<Article> articlePage = articleService.page(new Page<>(current, size), articleService.getQueryWrapper(articleQueryRequest));
        return AjaxResult.success(articlePage);
    }

    /**
     * 分页获取封装列表
     */
    @PostMapping("/list/page/vo")
    @ValidateRequest
    public AjaxResult listArticleVOByPage(@RequestBody ArticleQueryRequest articleQueryRequest) {
        long current = articleQueryRequest.getCurrent();
        long size = articleQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Article> articlePage = articleService.page(new Page<>(current, size), articleService.getQueryWrapper(articleQueryRequest));
        Page<ArticleVO> articleVOPage = PageUtils.convert(articlePage, articleService::getArticleVO);
        return AjaxResult.success(articleVOPage);
    }

    // endregion
}

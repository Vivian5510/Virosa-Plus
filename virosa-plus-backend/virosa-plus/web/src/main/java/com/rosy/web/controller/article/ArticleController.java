package com.rosy.web.controller.article;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.annotation.ValidateRequest;
import com.rosy.common.domain.AjaxResult;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.PageUtils;
import com.rosy.common.utils.ThrowUtils;
import com.rosy.main.domain.Article;
import com.rosy.main.domain.Node;
import com.rosy.main.service.IArticleService;
import com.rosy.main.service.INodeService;
import com.rosy.web.controller.article.vo.req.ArticleAddReqVO;
import com.rosy.web.controller.article.vo.req.ArticleQueryReqVO;
import com.rosy.web.controller.article.vo.req.ArticleUpdateReqVO;
import com.rosy.web.controller.article.vo.req.NodeArticleReqVO;
import com.rosy.web.controller.article.vo.resp.ArticleRespVO;
import com.rosy.web.controller.article.vo.resp.NodeRespVO;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * <p>
 * 文章 前端控制器
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@RestController
@RequestMapping("/articles")
public class ArticleController {

    @Resource
    private IArticleService articleService;

    @Resource
    private INodeService nodeService;

    /**
     * 创建文章
     */
    @PostMapping
    @ValidateRequest
    public AjaxResult createArticle(@RequestBody ArticleAddReqVO reqVO) {
        // 保存文章
        Article article = new Article();
        BeanUtils.copyProperties(reqVO, article);
        boolean result = articleService.save(article);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);

        return AjaxResult.success(article.getId());
    }

    /**
     * 删除文章
     */
    @DeleteMapping("/{id}")
    @ValidateRequest
    public AjaxResult deleteArticle(@PathVariable("id") Long id) {
        // 首先查找所有引用此文章的节点并删除
        List<Node> nodes = nodeService.lambdaQuery()
                .eq(Node::getArticleId, id)
                .eq(Node::getType, "file")
                .list();

        if (!nodes.isEmpty()) {
            for (Node node : nodes) {
                nodeService.removeById(node.getId());
            }
        }

        // 然后删除文章
        boolean result = articleService.removeById(id);
        return AjaxResult.success(result);
    }

    /**
     * 更新文章
     */
    @PutMapping("/{id}")
    @ValidateRequest
    public AjaxResult updateArticle(@PathVariable("id") Long id, @RequestBody ArticleUpdateReqVO reqVO) {
        // 确保ID匹配
        if (!id.equals(reqVO.getId())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "路径ID与请求体ID不一致");
        }

        // 更新文章
        Article article = new Article();
        BeanUtils.copyProperties(reqVO, article);
        boolean result = articleService.updateById(article);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);

        // 如果标题变化了，那么更新对应的所有节点名称
        if (reqVO.getTitle() != null) {
            List<Node> nodes = nodeService.lambdaQuery()
                    .eq(Node::getArticleId, id)
                    .eq(Node::getType, "file")
                    .list();

            if (!nodes.isEmpty()) {
                for (Node node : nodes) {
                    node.setName(reqVO.getTitle());
                    nodeService.updateById(node);
                }
            }
        }

        return AjaxResult.success(true);
    }

    /**
     * 根据ID获取文章详情
     */
    @GetMapping("/{id}")
    @ValidateRequest
    public AjaxResult getArticleById(@PathVariable("id") Long id) {
        Article article = articleService.getById(id);
        ThrowUtils.throwIf(article == null, ErrorCode.NOT_FOUND_ERROR);

        // 转换为VO
        ArticleRespVO respVO = new ArticleRespVO();
        BeanUtils.copyProperties(article, respVO);

        return AjaxResult.success(respVO);
    }

    /**
     * 条件查询文章分页列表
     */
    @GetMapping
    @ValidateRequest
    public AjaxResult listArticles(ArticleQueryReqVO reqVO) {
        // 限制爬虫
        ThrowUtils.throwIf(reqVO.getPageSize() > 20, ErrorCode.PARAMS_ERROR);

        // 查询条件转换
        Article queryArticle = new Article();
        BeanUtils.copyProperties(reqVO, queryArticle);

        // 查询数据
        Page<Article> articlePage = articleService.page(
                new Page<>(reqVO.getPageNum(), reqVO.getPageSize()),
                articleService.getQueryWrapper(queryArticle));

        // 转换为VO
        Page<ArticleRespVO> respVOPage = PageUtils.convert(articlePage, article -> {
            ArticleRespVO respVO = new ArticleRespVO();
            BeanUtils.copyProperties(article, respVO);
            return respVO;
        });

        return AjaxResult.success(respVOPage);
    }

    /**
     * 获取文章所在的所有目录节点
     */
    @GetMapping("/{id}/nodes")
    @ValidateRequest
    public AjaxResult getArticleNodes(@PathVariable("id") Long id) {
        // 检查文章是否存在
        Article article = articleService.getById(id);
        ThrowUtils.throwIf(article == null, ErrorCode.NOT_FOUND_ERROR, "文章不存在");

        // 查找所有引用此文章的节点
        List<Node> nodes = nodeService.lambdaQuery()
                .eq(Node::getArticleId, id)
                .eq(Node::getType, "file")
                .list();

        List<NodeRespVO> nodeRespVOs = nodes.stream().map(node -> {
            NodeRespVO respVO = new NodeRespVO();
            BeanUtils.copyProperties(node, respVO);
            return respVO;
        }).collect(Collectors.toList());

        return AjaxResult.success(nodeRespVOs);
    }

    /**
     * 获取未归档的文章（没有关联到任何目录节点的文章）
     */
    @GetMapping("/unarchived")
    @ValidateRequest
    public AjaxResult getUnarchivedArticles(ArticleQueryReqVO reqVO) {
        // 限制爬虫
        ThrowUtils.throwIf(reqVO.getPageSize() > 20, ErrorCode.PARAMS_ERROR);

        // 查询条件转换
        Article queryArticle = new Article();
        BeanUtils.copyProperties(reqVO, queryArticle);

        // 获取当前所有文章
        Page<Article> articlePage = articleService.page(
                new Page<>(reqVO.getPageNum(), reqVO.getPageSize()),
                articleService.getQueryWrapper(queryArticle));

        // 获取所有已经归档的文章ID
        Set<Long> archivedArticleIds = nodeService.lambdaQuery()
                .eq(Node::getType, "file")
                .isNotNull(Node::getArticleId)
                .list()
                .stream()
                .map(Node::getArticleId)
                .collect(Collectors.toSet());

        // 过滤掉已归档的文章
        List<Article> unarchivedArticles = articlePage.getRecords().stream()
                .filter(article -> !archivedArticleIds.contains(article.getId()))
                .collect(Collectors.toList());

        Page<Article> resultPage = new Page<>(reqVO.getPageNum(), reqVO.getPageSize(), articlePage.getTotal());
        resultPage.setRecords(unarchivedArticles);

        // 转换为VO
        Page<ArticleRespVO> responseVOPage = PageUtils.convert(resultPage, article -> {
            ArticleRespVO respVO = new ArticleRespVO();
            BeanUtils.copyProperties(article, respVO);
            return respVO;
        });

        return AjaxResult.success(responseVOPage);
    }

    /**
     * 将文章添加到目录中
     */
    @PostMapping("/{id}/directory")
    @ValidateRequest
    public AjaxResult addArticleToDirectory(@PathVariable("id") Long id, @RequestBody NodeArticleReqVO reqVO) {
        // 检查文章是否存在
        Article article = articleService.getById(id);
        ThrowUtils.throwIf(article == null, ErrorCode.NOT_FOUND_ERROR, "文章不存在");

        // 检查节点是否存在且为目录节点
        Node directory = nodeService.getById(reqVO.getNodeId());
        ThrowUtils.throwIf(directory == null, ErrorCode.NOT_FOUND_ERROR, "目录节点不存在");
        ThrowUtils.throwIf(!"directory".equals(directory.getType()), ErrorCode.PARAMS_ERROR, "指定的节点不是一个目录节点");

        // 创建新的文件节点
        Node fileNode = new Node();
        fileNode.setName(article.getTitle());
        fileNode.setType("file");
        fileNode.setArticleId(id);
        fileNode.setParentId(reqVO.getNodeId());
        fileNode.setStatus((byte) 1);

        boolean result = nodeService.save(fileNode);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);

        return AjaxResult.success(fileNode.getId());
    }

    /**
     * 获取书评类型的文章
     */
    @GetMapping("/types/books")
    @ValidateRequest
    public AjaxResult getBookReviews(ArticleQueryReqVO reqVO) {
        reqVO.setCategory("书评");
        return listArticles(reqVO);
    }

    /**
     * 获取影评类型的文章
     */
    @GetMapping("/types/videos")
    @ValidateRequest
    public AjaxResult getVideoReviews(ArticleQueryReqVO reqVO) {
        reqVO.setCategory("影评");
        return listArticles(reqVO);
    }

    /**
     * 获取乐评类型的文章
     */
    @GetMapping("/types/music")
    @ValidateRequest
    public AjaxResult getMusicReviews(ArticleQueryReqVO reqVO) {
        reqVO.setCategory("乐评");
        return listArticles(reqVO);
    }

    /**
     * 获取名人评传类型的文章
     */
    @GetMapping("/types/famous")
    @ValidateRequest
    public AjaxResult getFamousPeople(ArticleQueryReqVO reqVO) {
        reqVO.setCategory("名人评传");
        return listArticles(reqVO);
    }

    /**
     * 按作者查询文章
     */
    @GetMapping("/by-author")
    @ValidateRequest
    public AjaxResult getByAuthor(ArticleQueryReqVO reqVO) {
        ThrowUtils.throwIf(reqVO.getAuthor() == null, ErrorCode.PARAMS_ERROR, "作者参数不能为空");
        return listArticles(reqVO);
    }
}

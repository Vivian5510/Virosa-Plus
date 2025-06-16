package com.rosy.web.controller.article;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.domain.AjaxResult;
import com.rosy.common.domain.PageResult;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.enums.StatusEnum;
import com.rosy.common.exception.ServiceException;
import com.rosy.common.utils.ThrowUtils;
import com.rosy.main.domain.Article;
import com.rosy.main.domain.Node;
import com.rosy.common.enums.NodeType;
import com.rosy.main.service.IArticleService;
import com.rosy.main.service.INodeService;
import com.rosy.web.controller.article.vo.req.ArticleAddReqVO;
import com.rosy.web.controller.article.vo.req.ArticleQueryReqVO;
import com.rosy.web.controller.article.vo.req.ArticleUpdateReqVO;
import com.rosy.web.controller.article.vo.req.NodeArticleReqVO;
import com.rosy.web.controller.article.vo.resp.ArticleRespVO;
import com.rosy.web.controller.article.vo.resp.NodeRespVO;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.validation.annotation.Validated;
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
@Validated
public class ArticleController {

    @Resource
    private IArticleService articleService;

    @Resource
    private INodeService nodeService;

    /**
     * 创建文章
     */
    @PostMapping
    public AjaxResult createArticle(@Valid @RequestBody ArticleAddReqVO reqVO) {
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
    public AjaxResult deleteArticle(@PathVariable("id") Long id) {
        // 首先查找所有引用此文章的节点并删除
        List<Node> nodes = nodeService.lambdaQuery()
                .eq(Node::getArticleId, id)
                .eq(Node::getType, NodeType.FILE.getCode())
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
    public AjaxResult updateArticle(@PathVariable("id") Long id, @Valid @RequestBody ArticleUpdateReqVO reqVO) {
        // 确保ID匹配
        if (!id.equals(reqVO.getId())) {
            throw new ServiceException(ErrorCode.PARAMS_ERROR, "路径ID与请求体ID不一致");
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
                    .eq(Node::getType, NodeType.FILE.getCode())
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
    @GetMapping("/page")
    public AjaxResult page(@Valid ArticleQueryReqVO reqVO) {
        // 将请求参数转换为查询条件
        Article article = new Article();
        BeanUtils.copyProperties(reqVO, article);

        // 调用服务层获取分页数据，返回PageResult
        PageResult<Article> pageResult = articleService.getArticlePage(reqVO.getPageNum(), reqVO.getPageSize(),
                article);

        return AjaxResult.success(pageResult);
    }

    /**
     * 获取文章所在的所有目录节点
     */
    @GetMapping("/{id}/nodes")
    public AjaxResult getArticleNodes(@PathVariable("id") Long id) {
        // 检查文章是否存在
        Article article = articleService.getById(id);
        ThrowUtils.throwIf(article == null, ErrorCode.NOT_FOUND_ERROR, "文章不存在");

        // 查找所有引用此文章的节点
        List<Node> nodes = nodeService.lambdaQuery()
                .eq(Node::getArticleId, id)
                .eq(Node::getType, NodeType.FILE.getCode())
                .list();

        // 使用Hutool的BeanUtil进行转换
        List<NodeRespVO> nodeRespVOs = BeanUtil.copyToList(nodes, NodeRespVO.class);

        return AjaxResult.success(nodeRespVOs);
    }

    /**
     * 获取未归档的文章（没有关联到任何目录节点的文章）
     */
    @GetMapping("/unarchived")
    public AjaxResult getUnarchivedArticles(@Valid ArticleQueryReqVO reqVO) {
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
                .eq(Node::getType, NodeType.FILE.getCode())
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

        // 转换为PageResult，使用Hutool的BeanUtil
        List<ArticleRespVO> respVOList = BeanUtil.copyToList(resultPage.getRecords(), ArticleRespVO.class);
        PageResult<ArticleRespVO> pageResult = new PageResult<>(respVOList, resultPage.getTotal());
        return AjaxResult.success(pageResult);
    }

    /**
     * 将文章添加到目录中
     */
    @PostMapping("/{id}/directory")
    public AjaxResult addArticleToDirectory(@PathVariable("id") Long id, @Valid @RequestBody NodeArticleReqVO reqVO) {
        // 检查文章是否存在
        Article article = articleService.getById(id);
        ThrowUtils.throwIf(article == null, ErrorCode.NOT_FOUND_ERROR, "文章不存在");

        // 检查节点是否存在且为目录节点
        Node directory = nodeService.getById(reqVO.getNodeId());
        ThrowUtils.throwIf(directory == null, ErrorCode.NOT_FOUND_ERROR, "目录节点不存在");
        ThrowUtils.throwIf(!NodeType.DIRECTORY.getCode().equals(directory.getType()),
                ErrorCode.PARAMS_ERROR, "指定的节点不是一个目录节点");

        // 创建新的文件节点
        Node fileNode = new Node();
        fileNode.setName(article.getTitle());
        fileNode.setType(NodeType.FILE.getCode());
        fileNode.setArticleId(id);
        fileNode.setParentId(reqVO.getNodeId());
        fileNode.setStatus(StatusEnum.ENABLED.getCode());

        boolean result = nodeService.save(fileNode);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);

        return AjaxResult.success(fileNode.getId());
    }
}

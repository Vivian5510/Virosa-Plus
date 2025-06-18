package com.rosy.virosa.support.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.virosa.support.domain.Node;

import java.util.List;

/**
 * <p>
 * 节点 服务类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
public interface INodeService extends IService<Node> {
    /**
     * 获取查询包装器
     *
     * @param node 查询条件
     * @return 查询包装器
     */
    Wrapper<Node> getQueryWrapper(Node node);

    /**
     * 添加文章到目录
     *
     * @param articleId       文章ID
     * @param directoryNodeId 目录节点ID
     * @param nodeName        节点名称（可为空，默认使用文章标题）
     * @return 新创建的节点ID
     */
    Long addArticleToDirectory(Long articleId, Long directoryNodeId, String nodeName);

    /**
     * 从目录中移除文章
     *
     * @param nodeId 节点ID
     * @return 是否成功移除
     */
    boolean removeArticleFromDirectory(Long nodeId);

    /**
     * 移动节点到新的父目录
     *
     * @param nodeId      节点ID
     * @param newParentId 新的父目录ID
     * @return 是否成功移动
     */
    boolean moveNode(Long nodeId, Long newParentId);

    /**
     * 获取树形结构的节点
     *
     * @return 根节点列表
     */
    List<Node> getFileTree();
}

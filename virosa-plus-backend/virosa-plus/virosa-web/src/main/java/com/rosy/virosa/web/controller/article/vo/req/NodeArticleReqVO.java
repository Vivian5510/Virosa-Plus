package com.rosy.virosa.web.controller.article.vo.req;

import lombok.Data;

import java.io.Serializable;

/**
 * 节点文章关联请求对象
 */
@Data
public class NodeArticleReqVO implements Serializable {

    /**
     * 节点ID
     */
    private Long nodeId;

    /**
     * 文章ID
     */
    private Long articleId;

    /**
     * 目录节点ID
     */
    private Long directoryNodeId;

    /**
     * 节点名称（可选，默认使用文章标题）
     */
    private String nodeName;
}
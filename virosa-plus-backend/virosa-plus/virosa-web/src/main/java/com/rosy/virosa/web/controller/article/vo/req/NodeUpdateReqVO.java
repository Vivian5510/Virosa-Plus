package com.rosy.virosa.web.controller.article.vo.req;

import lombok.Data;

import java.io.Serializable;

/**
 * 节点更新请求对象
 */
@Data
public class NodeUpdateReqVO implements Serializable {

    /**
     * ID
     */
    private Long id;

    /**
     * 节点名称
     */
    private String name;

    /**
     * 节点类型 (directory: 目录, file: 文章)
     */
    private String type;

    /**
     * 父节点ID，如果是顶级节点则为null或0
     */
    private Long parentId;

    /**
     * 所属文章ID（当type=file时使用）
     */
    private Long articleId;

    /**
     * 状态（0: 关闭, 1: 开启）
     */
    private Integer status;
}
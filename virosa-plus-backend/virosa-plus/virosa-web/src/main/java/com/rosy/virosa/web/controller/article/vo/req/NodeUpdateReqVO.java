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
     * 节点标题
     */
    private String title;

    /**
     * 节点内容
     */
    private String content;

    /**
     * 父节点ID，如果是顶级节点则为null
     */
    private Long parentId;

    /**
     * 所属文章ID
     */
    private Long articleId;

    /**
     * 排序号
     */
    private Integer orderNum;
}
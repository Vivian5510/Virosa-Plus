package com.rosy.virosa.web.controller.article.vo.req;

import com.rosy.virosa.common.domain.PageParam;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 节点查询请求对象
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class NodeQueryReqVO extends PageParam {

    /**
     * 节点名称，模糊匹配
     */
    private String name;

    /**
     * 节点类型 (directory: 目录, file: 文章)
     */
    private String type;

    /**
     * 父节点ID
     */
    private Long parentId;

    /**
     * 所属文章ID
     */
    private Long articleId;

    /**
     * 状态（0: 关闭, 1: 开启）
     */
    private Integer status;
}
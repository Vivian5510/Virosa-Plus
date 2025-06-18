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
     * 节点标题，模糊匹配
     */
    private String title;

    /**
     * 父节点ID
     */
    private Long parentId;

    /**
     * 所属文章ID
     */
    private Long articleId;
}
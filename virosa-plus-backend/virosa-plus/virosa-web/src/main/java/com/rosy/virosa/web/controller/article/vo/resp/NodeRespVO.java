package com.rosy.virosa.web.controller.article.vo.resp;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 节点表(Node)表响应视图对象
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NodeRespVO implements Serializable {

    /**
     * 节点ID
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
     * 父节点ID，如果是顶级节点则为null
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

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 子节点列表
     */
    private List<NodeRespVO> children;
}
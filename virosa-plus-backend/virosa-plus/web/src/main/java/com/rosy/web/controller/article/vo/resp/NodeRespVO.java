package com.rosy.web.controller.article.vo.resp;

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

    /**
     * 子节点列表
     */
    private List<NodeRespVO> children;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 状态（0: 关闭, 1: 开启）
     */
    private Byte status;
}
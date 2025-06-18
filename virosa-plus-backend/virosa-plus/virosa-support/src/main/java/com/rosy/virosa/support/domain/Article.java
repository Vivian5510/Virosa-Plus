package com.rosy.virosa.support.domain;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 文章
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Data
@TableName("`virosa-plus-article`")
public class Article implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 标题
     */
    private String title;

    /**
     * 封面
     */
    private String cover;

    /**
     * 类型: 随笔/技术/生活/书评/影评/乐评/名人评传
     */
    private String type;

    /**
     * 作者/艺术家 (适用于书评/乐评等)
     */
    private String author;

    /**
     * 额外信息 (如音乐的专辑名、书的出版社等)
     */
    private String extraInfo;

    /**
     * 外部链接 (如音乐链接、视频链接等)
     */
    private String externalLink;

    /**
     * 内容
     */
    private String content;

    /**
     * 是否已发布（0: 草稿, 1: 已发布）
     */
    private Integer isPublished;

    /**
     * 更新时间
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /**
     * 版本
     */
    @Version
    private Integer version;

    /**
     * 是否删除
     */
    @TableLogic
    private Integer isDeleted;
}

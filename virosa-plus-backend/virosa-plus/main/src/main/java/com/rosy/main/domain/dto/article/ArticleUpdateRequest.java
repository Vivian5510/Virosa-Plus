package com.rosy.main.domain.dto.article;

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
public class ArticleUpdateRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
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
     * 类型: 随笔/技术/生活
     */
    private String type;

    /**
     * 内容
     */
    private String content;

    /**
     * 是否已发布（0: 草稿, 1: 已发布）
     */
    private Byte isPublished;
}

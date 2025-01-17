package com.rosy.main.domain.dto.famous;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;


/**
 * <p>
 * 名人
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Data
public class FamousUpdateRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    private Long id;

    /**
     * 名称
     */
    private String name;

    /**
     * 封面
     */
    private String cover;

    /**
     * 内容
     */
    private String content;

    /**
     * 是否已发布（0: 草稿, 1: 已发布）
     */
    private Byte isPublished;
}

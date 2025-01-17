package com.rosy.main.domain.dto.famous;

import com.baomidou.mybatisplus.annotation.*;
import com.rosy.common.domain.entity.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;


/**
 * <p>
 * 名人
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class FamousQueryRequest extends PageRequest implements Serializable {

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
     * 内容
     */
    private String content;

    /**
     * 是否已发布（0: 草稿, 1: 已发布）
     */
    private Byte isPublished;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}

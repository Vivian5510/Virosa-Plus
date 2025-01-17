package com.rosy.main.domain.dto.message;

import com.baomidou.mybatisplus.annotation.*;
import com.rosy.common.domain.entity.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 留言
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class MessageQueryRequest extends PageRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    private Long id;

    /**
     * 内容
     */
    private String content;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}

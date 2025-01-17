package com.rosy.main.domain.dto.message;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

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
@Data
public class MessageUpdateRequest implements Serializable {

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
}

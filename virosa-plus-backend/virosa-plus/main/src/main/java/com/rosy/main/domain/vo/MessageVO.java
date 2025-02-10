package com.rosy.main.domain.vo;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonInclude;
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
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageVO implements Serializable {

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

    private String name;

    private String username;

    private String avatar;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}

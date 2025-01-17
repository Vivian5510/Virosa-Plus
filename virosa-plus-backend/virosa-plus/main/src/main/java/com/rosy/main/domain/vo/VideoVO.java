package com.rosy.main.domain.vo;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 影视
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Data
public class VideoVO implements Serializable {

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
     * 类型: 电影/纪录片/动漫/其他
     */
    private String type;

    /**
     * 内容
     */
    private String content;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;
}

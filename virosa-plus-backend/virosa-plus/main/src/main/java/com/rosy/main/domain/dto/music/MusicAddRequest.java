package com.rosy.main.domain.dto.music;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 音乐
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Data
public class MusicAddRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 名称
     */
    private String name;

    /**
     * 作者
     */
    private String artist;

    /**
     * 专辑
     */
    private String album;

    /**
     * 封面
     */
    private String cover;

    /**
     * 链接
     */
    private String url;

    /**
     * 时长
     */
    private Byte duration;

    /**
     * 是否已发布（0: 草稿, 1: 已发布）
     */
    private Byte isPublished;
}

package com.rosy.main.domain.vo;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 节点
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Data
@TableName("virosa-plus-node")
public class NodeVO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    private Long id;

    /**
     * 名称（文章或者目录的名字）
     */
    private String name;

    /**
     * 是文章还是目录（0: 目录, 1: 文章）
     */
    private Byte type;

    /**
     * 是否已发布（0: 关闭, 1: 开启）
     */
    private Byte status;
}

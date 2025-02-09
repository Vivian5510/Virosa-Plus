package com.rosy.main.domain.dto.node;

import com.baomidou.mybatisplus.annotation.*;
import com.rosy.common.domain.entity.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

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
@EqualsAndHashCode(callSuper = true)
@Data
public class NodeQueryRequest extends PageRequest implements Serializable {

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
    private String type;

    /**
     * 父目录
     */
    private Long parentId;

    /**
     * 是否已发布（0: 关闭, 1: 开启）
     */
    private Byte status;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}

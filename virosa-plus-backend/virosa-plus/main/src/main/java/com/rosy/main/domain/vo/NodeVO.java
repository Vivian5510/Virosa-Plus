package com.rosy.main.domain.vo;

import com.alibaba.fastjson2.annotation.JSONField;
import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * <p>
 * 节点
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
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
    private String type;

    /**
     * 子节点
     */
    private List<NodeVO> children;

    /**
     * 是否已发布（0: 关闭, 1: 开启）
     */
    private Byte status;
}

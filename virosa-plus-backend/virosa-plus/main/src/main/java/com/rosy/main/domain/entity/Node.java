package com.rosy.main.domain.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.Version;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 节点
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Data
@TableName("`virosa-plus-node`")
public class Node implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId(value = "id", type = IdType.AUTO)
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
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /**
     * 版本
     */
    @Version
    private Byte version;

    /**
     * 是否删除
     */
    @TableLogic
    private Byte isDeleted;
}

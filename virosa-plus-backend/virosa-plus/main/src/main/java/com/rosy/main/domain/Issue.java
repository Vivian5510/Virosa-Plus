package com.rosy.main.domain;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.Version;

import java.time.LocalDateTime;

import lombok.Data;

/**
 * <p>
 * 问题
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */

@Data
@TableName("`virosa-plus-issue`")
public class Issue {

    /**
     * id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 标题
     */
    private String title;

    /**
     * 类型: BUG/FEATURE/OTHER
     */
    private String type;

    /**
     * 问题描述
     */
    private String description;

    /**
     * 标签，多个以逗号分隔
     */
    private String tags;

    /**
     * 状态: OPEN/CLOSE/RESOLVED/IN_PROGRESS
     */
    private Integer status;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 联系邮箱
     */
    private String email;

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
    private Integer version;

    /**
     * 是否删除
     */
    @TableLogic
    private Integer isDeleted;
}

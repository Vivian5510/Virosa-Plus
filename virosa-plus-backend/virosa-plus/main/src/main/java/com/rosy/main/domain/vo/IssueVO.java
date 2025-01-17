package com.rosy.main.domain.vo;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class IssueVO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
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
     * 状态: OPEN/CLOSE/RESOLVED/IN_PROGRESS
     */
    private Byte status;

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
    private LocalDateTime updateTime;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}


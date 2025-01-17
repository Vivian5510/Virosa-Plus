package com.rosy.main.domain.dto.issue;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 问题
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */

@Data
public class IssueAddRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

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
     * 联系邮箱
     */
    private String email;

    /**
     * 昵称
     */
    private String nickname;
}

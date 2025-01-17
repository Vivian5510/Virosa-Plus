package com.rosy.main.domain.dto.issue;

import com.baomidou.mybatisplus.annotation.*;
import com.rosy.common.domain.entity.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

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

@EqualsAndHashCode(callSuper = true)
@Data
public class IssueQueryRequest extends PageRequest implements Serializable {

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
     * 联系邮箱
     */
    private String email;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}

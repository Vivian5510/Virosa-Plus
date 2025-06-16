package com.rosy.web.controller.message.vo.resp;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 消息表(Message)表响应视图对象
 */
@Data
public class MessageRespVO {

    /**
     * id
     */
    private Long id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 电子邮件
     */
    private String email;

    /**
     * 消息内容
     */
    private String content;

    /**
     * 消息状态（0：未读；1：已读）
     */
    private Integer status;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 消息类型（0：公告通知；1：提醒；）
     */
    private Integer type;
}
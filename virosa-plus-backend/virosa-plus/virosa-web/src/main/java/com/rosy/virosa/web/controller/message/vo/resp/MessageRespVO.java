package com.rosy.virosa.web.controller.message.vo.resp;

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
     * 消息内容
     */
    private String content;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;
}
package com.rosy.virosa.web.controller.message.vo.req;

import lombok.Data;

import java.io.Serializable;

/**
 * 消息新增请求对象
 */
@Data
public class MessageAddReqVO implements Serializable {

    /**
     * 消息内容
     */
    private String content;

    /**
     * 消息类型（0：公告通知；1：提醒；）
     */
    private Integer type;
}
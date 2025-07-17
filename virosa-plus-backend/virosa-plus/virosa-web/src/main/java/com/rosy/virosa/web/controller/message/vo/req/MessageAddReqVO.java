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
}
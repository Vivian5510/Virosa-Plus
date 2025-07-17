package com.rosy.virosa.web.controller.message.vo.req;

import lombok.Data;

import java.io.Serializable;

/**
 * 消息更新请求对象
 */
@Data
public class MessageUpdateReqVO implements Serializable {

    /**
     * ID
     */
    private Long id;

    /**
     * 消息内容
     */
    private String content;
}
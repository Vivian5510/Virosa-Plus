package com.rosy.web.controller.message.vo.req;

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

    /**
     * 消息类型（0：公告通知；1：提醒；）
     */
    private Integer type;

    /**
     * 消息状态（0：未读；1：已读）
     */
    private Integer status;
}
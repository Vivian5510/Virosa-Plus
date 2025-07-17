package com.rosy.virosa.web.controller.message.vo.req;

import com.rosy.virosa.common.domain.PageParam;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 消息查询请求对象
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class MessageQueryReqVO extends PageParam {

    /**
     * 消息内容，模糊查询
     */
    private String content;
}
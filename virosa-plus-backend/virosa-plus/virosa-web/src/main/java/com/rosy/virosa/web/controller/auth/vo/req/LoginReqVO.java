package com.rosy.virosa.web.controller.auth.vo.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 登录请求对象
 */
@Data
public class LoginReqVO {

    /**
     * 用户名
     */
    @NotBlank(message = "用户名不能为空")
    private String username;

    /**
     * 密码
     */
    @NotBlank(message = "密码不能为空")
    private String password;
}
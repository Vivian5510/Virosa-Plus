package com.rosy.web.controller.auth.vo.req;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

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
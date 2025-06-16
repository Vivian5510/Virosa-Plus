package com.rosy.web.controller;

import com.rosy.main.domain.dto.LoginBody;
import com.rosy.main.service.ISysUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 认证控制器
 */
@Tag(name = "认证管理")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final ISysUserService userService;

    @Operation(summary = "登录")
    @PostMapping("/sign-in")
    public AjaxResult login(@Valid @RequestBody LoginBody loginBody) {
        return AjaxResult.success(userService.login(loginBody));
    }

    @Operation(summary = "获取当前用户信息")
    @GetMapping("/me")
    public AjaxResult getCurrentUser() {
        return AjaxResult.success(userService.getLoginUserInfo());
    }
}
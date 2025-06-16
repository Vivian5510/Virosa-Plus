package com.rosy.web.controller.auth;

import com.rosy.main.domain.SysUser;
import com.rosy.main.service.ISysUserService;
import com.rosy.web.controller.auth.vo.req.LoginReqVO;
import com.rosy.web.controller.common.api.CommonResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 认证控制器
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "认证管理", description = "认证管理相关接口")
public class AuthController {

    private final ISysUserService userService;

    /**
     * 登录
     */
    @PostMapping("/login")
    @Operation(summary = "用户登录", description = "用户登录接口")
    public CommonResult<Map<String, String>> login(@RequestBody LoginReqVO loginReq) {
        Map<String, String> loginParams = new HashMap<>();
        loginParams.put("username", loginReq.getUsername());
        loginParams.put("password", loginReq.getPassword());

        String token = userService.login(loginParams);
        Map<String, String> result = new HashMap<>();
        result.put("token", token);
        return CommonResult.success(result);
    }

    /**
     * 获取当前登录用户信息
     */
    @GetMapping("/info")
    @Operation(summary = "获取用户信息", description = "获取当前登录用户信息")
    public CommonResult<SysUser> getUserInfo() {
        SysUser user = userService.getLoginUserInfo();
        user.setPassword(null); // 不返回密码信息
        return CommonResult.success(user);
    }

    /**
     * 登出
     */
    @PostMapping("/logout")
    @Operation(summary = "退出登录", description = "用户退出登录接口")
    public CommonResult<Void> logout() {
        // 简化实现，因为使用JWT,客户端可自行清除token
        return CommonResult.success();
    }
}
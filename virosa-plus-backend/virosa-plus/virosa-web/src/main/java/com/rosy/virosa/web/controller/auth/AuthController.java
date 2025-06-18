package com.rosy.virosa.web.controller.auth;

import com.rosy.virosa.common.domain.AjaxResult;
import com.rosy.virosa.common.utils.JwtTokenProvider;
import com.rosy.virosa.support.domain.SysUser;
import com.rosy.virosa.support.service.ISysUserService;
import com.rosy.virosa.web.controller.auth.vo.req.LoginReqVO;
import com.rosy.virosa.web.controller.auth.vo.req.RegisterReqVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 认证控制器
 */
@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "认证管理", description = "认证管理相关接口")
public class AuthController {

    private final ISysUserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    /**
     * 登录
     */
    @PostMapping("/login")
    @Operation(summary = "用户登录", description = "用户登录接口")
    public AjaxResult login(@RequestBody LoginReqVO loginReq) {
        try {
            log.info("登录请求，用户名: {}", loginReq.getUsername());

            // 认证
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginReq.getUsername(),
                            loginReq.getPassword()));

            // 更新安全上下文
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 生成JWT令牌
            String token = tokenProvider.generateToken(authentication);

            log.info("用户[{}]登录成功", loginReq.getUsername());

            Map<String, String> result = new HashMap<>();
            result.put("token", token);
            return AjaxResult.success(result);
        } catch (BadCredentialsException e) {
            log.error("用户名或密码错误: {}", e.getMessage());
            return AjaxResult.error("用户名或密码错误");
        } catch (AuthenticationException e) {
            log.error("认证失败: {}", e.getMessage());
            return AjaxResult.error("认证失败: " + e.getMessage());
        } catch (Exception e) {
            log.error("登录异常: {}", e.getMessage(), e);
            return AjaxResult.error("登录失败: " + e.getMessage());
        }
    }

    /**
     * 注册
     */
    @PostMapping("/register")
    @Operation(summary = "用户注册", description = "用户注册接口")
    public AjaxResult register(@RequestBody RegisterReqVO registerReq) {
        try {
            Map<String, String> registerParams = new HashMap<>();
            registerParams.put("username", registerReq.getUsername());
            registerParams.put("password", registerReq.getPassword());
            // 只保留必要的字段

            String token = userService.register(registerParams);
            Map<String, String> result = new HashMap<>();
            result.put("token", token);
            return AjaxResult.success(result);
        } catch (Exception e) {
            log.error("注册失败: {}", e.getMessage());
            return AjaxResult.error("注册失败: " + e.getMessage());
        }
    }

    /**
     * 获取当前登录用户信息
     */
    @GetMapping("/info")
    @Operation(summary = "获取用户信息", description = "获取当前登录用户信息")
    public AjaxResult getUserInfo() {
        try {
            SysUser user = userService.getLoginUserInfo();
            user.setPassword(null); // 不返回密码信息
            return AjaxResult.success(user);
        } catch (Exception e) {
            log.error("获取用户信息失败: {}", e.getMessage());
            return AjaxResult.error("获取用户信息失败: " + e.getMessage());
        }
    }

    /**
     * 登出
     */
    @PostMapping("/logout")
    @Operation(summary = "退出登录", description = "用户退出登录接口")
    public AjaxResult logout() {
        SecurityContextHolder.clearContext();
        return AjaxResult.success("退出成功");
    }
}
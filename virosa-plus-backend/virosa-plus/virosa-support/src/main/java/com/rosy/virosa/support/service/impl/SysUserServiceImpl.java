package com.rosy.virosa.support.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rosy.virosa.common.utils.JwtTokenProvider;
import com.rosy.virosa.support.domain.SysUser;
import com.rosy.virosa.support.mapper.SysUserMapper;
import com.rosy.virosa.support.service.ISysUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

/**
 * 用户服务实现类
 */
@Service
@RequiredArgsConstructor
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements ISysUserService {

    private final SysUserMapper userMapper;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String login(Map<String, String> loginParams) {
        String username = loginParams.get("username");
        String password = loginParams.get("password");

        // 参数校验
        if (username == null || password == null) {
            throw new RuntimeException("用户名或密码不能为空");
        }

        try {
            // 使用Spring Security进行认证
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));

            // 设置认证信息
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 生成JWT令牌
            return jwtTokenProvider.generateToken(authentication);
        } catch (Exception e) {
            throw new RuntimeException("认证失败: " + e.getMessage());
        }
    }

    @Override
    public SysUser getLoginUserInfo() {
        // 从SecurityContext获取用户名
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        SysUser user = userMapper.selectOne(
                new LambdaQueryWrapper<SysUser>()
                        .eq(SysUser::getUsername, username));

        if (user == null) {
            throw new RuntimeException("用户不存在");
        }

        // 清除敏感信息
        user.setPassword(null);

        return user;
    }

    @Override
    public String register(Map<String, String> registerParams) {
        String username = registerParams.get("username");
        String password = registerParams.get("password");

        // 参数校验
        if (username == null || password == null) {
            throw new RuntimeException("用户名或密码不能为空");
        }

        // 检查用户名是否已存在
        SysUser existUser = userMapper.selectOne(
                new LambdaQueryWrapper<SysUser>()
                        .eq(SysUser::getUsername, username));

        if (existUser != null) {
            throw new RuntimeException("用户名已存在");
        }

        // 创建新用户
        SysUser newUser = new SysUser();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password)); // 使用密码编码器加密密码
        newUser.setStatus(0); // 正常状态 (0: 正常, 1: 禁用)

        // 保存用户
        userMapper.insert(newUser);

        // 创建认证对象
        UserDetails userDetails = new User(
                username,
                newUser.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());

        // 生成JWT令牌
        return jwtTokenProvider.generateToken(authentication);
    }
}
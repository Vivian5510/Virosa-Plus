package com.rosy.main.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rosy.main.domain.SysUser;
import com.rosy.main.mapper.SysUserMapper;
import com.rosy.main.service.ISysUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.HashMap;
import java.util.Date;
import java.util.UUID;

/**
 * 用户服务实现类
 */
@Service
@RequiredArgsConstructor
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements ISysUserService {

    private final SysUserMapper userMapper;

    @Override
    public String login(Map<String, String> loginParams) {
        String username = loginParams.get("username");
        String password = loginParams.get("password");

        // 参数校验
        if (username == null || password == null) {
            throw new RuntimeException("用户名或密码不能为空");
        }

        // 查询用户
        SysUser user = userMapper.selectOne(
                new LambdaQueryWrapper<SysUser>()
                        .eq(SysUser::getUsername, username));

        // 用户不存在
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }

        // 账号状态检查
        if (user.getStatus() != null && user.getStatus() == 0) {
            throw new RuntimeException("账号已被禁用");
        }

        // 简单密码验证（实际生产中应使用加密算法）
        if (!password.equals(user.getPassword())) {
            throw new RuntimeException("密码错误");
        }

        // 生成简单令牌

        return generateToken();
    }

    @Override
    public SysUser getLoginUserInfo() {
        // 这里简化为返回admin用户
        // 实际应用中需要从令牌中获取用户信息
        SysUser user = userMapper.selectOne(
                new LambdaQueryWrapper<SysUser>()
                        .eq(SysUser::getUsername, "admin"));

        if (user == null) {
            throw new RuntimeException("用户不存在");
        }

        // 清除敏感信息
        user.setPassword(null);

        return user;
    }

    /**
     * 生成简单令牌
     */
    private String generateToken() {
        return "Bearer " + UUID.randomUUID().toString().replace("-", "");
    }
}
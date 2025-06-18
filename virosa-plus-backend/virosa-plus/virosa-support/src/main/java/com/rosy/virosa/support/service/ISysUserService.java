package com.rosy.virosa.support.service;

import com.rosy.virosa.support.domain.SysUser;

import java.util.Map;

/**
 * 用户服务接口
 */
public interface ISysUserService {

    /**
     * 用户登录
     *
     * @param loginParams 登录信息（包含username和password字段）
     * @return 登录结果（JWT令牌）
     */
    String login(Map<String, String> loginParams);

    /**
     * 获取当前登录用户信息
     *
     * @return 用户信息
     */
    SysUser getLoginUserInfo();

    /**
     * 用户注册
     *
     * @param registerParams 注册信息（包含username、password、email等字段）
     * @return 注册结果（JWT令牌）
     */
    String register(Map<String, String> registerParams);

    /**
     * 根据用户名获取用户信息
     *
     * @param username 用户名
     * @return 用户信息
     */
    SysUser getByUsername(String username);
}
package com.rosy.main.service;

import com.rosy.main.domain.SysUser;

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
}
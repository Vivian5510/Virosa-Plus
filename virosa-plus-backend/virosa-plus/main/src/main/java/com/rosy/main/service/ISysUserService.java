package com.rosy.main.service;

import com.rosy.main.domain.dto.LoginBody;
import com.rosy.main.domain.entity.SysUser;

/**
 * 用户服务接口
 */
public interface ISysUserService {

    /**
     * 用户登录
     *
     * @param loginBody 登录信息
     * @return 登录结果（JWT令牌）
     */
    String login(LoginBody loginBody);

    /**
     * 获取当前登录用户信息
     *
     * @return 用户信息
     */
    SysUser getLoginUserInfo();
}
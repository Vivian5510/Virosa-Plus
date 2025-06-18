package com.rosy.virosa.support.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rosy.virosa.support.domain.SysUser;
import org.apache.ibatis.annotations.Mapper;

/**
 * 系统用户数据访问层
 */
@Mapper
public interface SysUserMapper extends BaseMapper<SysUser> {
}
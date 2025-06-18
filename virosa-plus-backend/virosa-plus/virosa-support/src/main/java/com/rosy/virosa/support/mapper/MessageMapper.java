package com.rosy.virosa.support.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rosy.virosa.support.domain.Message;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 留言 Mapper 接口
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Mapper
public interface MessageMapper extends BaseMapper<Message> {

}

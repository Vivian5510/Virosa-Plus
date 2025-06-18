package com.rosy.virosa.support.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rosy.virosa.support.domain.Article;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 文章 Mapper 接口
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Mapper
public interface ArticleMapper extends BaseMapper<Article> {

}

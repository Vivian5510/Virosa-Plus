package com.rosy.common.utils;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;
import org.apache.commons.lang3.StringUtils;

public class QueryWrapperUtil {

    /**
     * 添加等值条件
     *
     * @param queryWrapper 查询构造器
     * @param value        条件值
     * @param column       数据库字段映射
     * @param <T>          实体类型
     */
    public static <T> void addEqualCondition(LambdaQueryWrapper<T> queryWrapper, Object value, SFunction<T, ?> column) {
        if (value != null) {
            queryWrapper.eq(column, value);
        }
    }

    /**
     * 添加模糊查询条件
     *
     * @param queryWrapper 查询构造器
     * @param value        条件值
     * @param column       数据库字段映射
     * @param <T>          实体类型
     */
    public static <T> void addLikeCondition(LambdaQueryWrapper<T> queryWrapper, String value, SFunction<T, ?> column) {
        if (StringUtils.isNotBlank(value)) {
            queryWrapper.like(column, value);
        }
    }
}

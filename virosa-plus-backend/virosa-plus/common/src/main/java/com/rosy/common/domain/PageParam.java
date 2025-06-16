package com.rosy.common.domain;

import com.rosy.common.constant.CommonConstant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.checkerframework.common.value.qual.ArrayLen;

/**
 * 分页参数基类
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageParam {

    /**
     * 当前页号
     */
    private Integer pageNum = 1;

    /**
     * 页面大小
     */
    private Integer pageSize = 10;
}
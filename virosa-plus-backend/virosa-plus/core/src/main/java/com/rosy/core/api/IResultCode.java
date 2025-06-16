package com.rosy.core.api;

/**
 * 结果码接口
 */
public interface IResultCode {
    /**
     * 获取结果码
     */
    long getCode();
    
    /**
     * 获取结果信息
     */
    String getMessage();
} 
package com.rosy.virosa.common.exception;

import lombok.Getter;

/**
 * 业务异常
 */
@Getter
public class ServiceException extends RuntimeException {

    /**
     * 错误码
     */
    private Integer code;

    /**
     * 错误提示
     */
    private String message;

    /**
     * 空构造方法，避免反序列化问题
     */
    public ServiceException() {
    }

    public ServiceException(String message) {
        this.message = message;
    }

    public ServiceException(String message, Integer code) {
        this.message = message;
        this.code = code;
    }

    /**
     * 基于错误码构造异常
     */
    public ServiceException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.code = errorCode.getCode();
        this.message = errorCode.getMessage();
    }

    /**
     * 基于错误码和自定义消息构造异常
     */
    public ServiceException(ErrorCode errorCode, String message) {
        super(message);
        this.code = errorCode.getCode();
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
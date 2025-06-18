package com.rosy.virosa.common.exception;

import com.rosy.virosa.common.domain.AjaxResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.sql.SQLSyntaxErrorException;

/**
 * 全局异常处理器
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ServiceException.class)
    public AjaxResult serviceExceptionHandler(ServiceException e) {
        log.error("ServiceException", e);
        return AjaxResult.error(e.getCode(), e.getMessage());
    }

    /**
     * 处理SQL语法错误异常
     */
    @ExceptionHandler(SQLSyntaxErrorException.class)
    public AjaxResult sqlSyntaxErrorExceptionHandler(SQLSyntaxErrorException e) {
        log.error("SQLSyntaxErrorException", e);
        return AjaxResult.error(ErrorCode.SQL_ERROR.getCode(), "数据库操作异常：" + e.getMessage());
    }

    /**
     * 处理SQL异常
     */
    @ExceptionHandler(SQLException.class)
    public AjaxResult sqlExceptionHandler(SQLException e) {
        log.error("SQLException", e);
        return AjaxResult.error(ErrorCode.SQL_ERROR.getCode(), "数据库操作异常：" + e.getMessage());
    }

    /**
     * 处理数据访问异常
     */
    @ExceptionHandler(DataAccessException.class)
    public AjaxResult dataAccessExceptionHandler(DataAccessException e) {
        log.error("DataAccessException", e);
        return AjaxResult.error(ErrorCode.SQL_ERROR.getCode(), "数据库访问异常：" + e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public AjaxResult runtimeExceptionHandler(RuntimeException e) {
        log.error("RuntimeException", e);
        return AjaxResult.error(ErrorCode.SYSTEM_ERROR.getCode(), ErrorCode.SYSTEM_ERROR.getMessage());
    }
}

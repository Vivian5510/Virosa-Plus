package com.rosy.web.controller.main;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rosy.common.annotation.ValidateRequest;
import com.rosy.common.domain.entity.AjaxResult;
import com.rosy.common.domain.entity.IdRequest;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.PageUtils;
import com.rosy.common.utils.ThrowUtils;
import com.rosy.main.domain.dto.book.BookAddRequest;
import com.rosy.main.domain.dto.book.BookQueryRequest;
import com.rosy.main.domain.dto.book.BookUpdateRequest;
import com.rosy.main.domain.entity.Book;
import com.rosy.main.domain.vo.BookVO;
import com.rosy.main.service.IBookService;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 书籍 前端控制器
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@RestController
@RequestMapping("/book")
public class BookController {
    @Resource
    private IBookService bookService;

    // region 增删改查

    /**
     * 创建
     */
    @PostMapping("/add")
    @ValidateRequest
    public AjaxResult addBook(@RequestBody BookAddRequest bookAddRequest) {
        Book book = new Book();
        BeanUtils.copyProperties(bookAddRequest, book);
        boolean result = bookService.save(book);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(book.getId());
    }

    /**
     * 删除
     */
    @PostMapping("/delete")
    @ValidateRequest
    public AjaxResult deleteBook(@RequestBody IdRequest idRequest) {
        boolean result = bookService.removeById(idRequest.getId());
        return AjaxResult.success(result);
    }

    /**
     * 更新
     */
    @PostMapping("/update")
    @ValidateRequest
    public AjaxResult updateBook(@RequestBody BookUpdateRequest bookUpdateRequest) {
        if (bookUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Book book = BeanUtil.copyProperties(bookUpdateRequest, Book.class);
        boolean result = bookService.updateById(book);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(true);
    }

    /**
     * 根据 id 获取
     */
    @GetMapping("/get")
    @ValidateRequest
    public AjaxResult getBookById(Long id) {
        Book book = bookService.getById(id);
        ThrowUtils.throwIf(book == null, ErrorCode.NOT_FOUND_ERROR);
        return AjaxResult.success(book);
    }

    /**
     * 根据 id 获取包装类
     */
    @GetMapping("/get/vo")
    @ValidateRequest
    public AjaxResult getBookVOById(Long id) {
        AjaxResult response = getBookById(id);
        Book book = (Book) response.get(AjaxResult.DATA_TAG);
        return AjaxResult.success(bookService.getBookVO(book));
    }

    /**
     * 分页获取列表
     */
    @PostMapping("/list/page")
    @ValidateRequest
    public AjaxResult listBookByPage(@RequestBody BookQueryRequest bookQueryRequest) {
        long current = bookQueryRequest.getCurrent();
        long size = bookQueryRequest.getPageSize();
        Page<Book> bookPage = bookService.page(new Page<>(current, size), bookService.getQueryWrapper(bookQueryRequest));
        return AjaxResult.success(bookPage);
    }

    /**
     * 分页获取封装列表
     */
    @PostMapping("/list/page/vo")
    @ValidateRequest
    public AjaxResult listBookVOByPage(@RequestBody BookQueryRequest bookQueryRequest) {
        long current = bookQueryRequest.getCurrent();
        long size = bookQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Book> bookPage = bookService.page(new Page<>(current, size), bookService.getQueryWrapper(bookQueryRequest));
        Page<BookVO> bookVOPage = PageUtils.convert(bookPage, bookService::getBookVO);
        return AjaxResult.success(bookVOPage);
    }

    // endregion
}

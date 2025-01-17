package com.rosy.main.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.rosy.main.domain.dto.book.BookQueryRequest;
import com.rosy.main.domain.entity.Book;
import com.rosy.main.domain.entity.Book;
import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.main.domain.vo.BookVO;

/**
 * <p>
 * 书籍 服务类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
public interface IBookService extends IService<Book> {
    BookVO getBookVO(Book book);

    Wrapper<Book> getQueryWrapper(BookQueryRequest bookQueryRequest);
}

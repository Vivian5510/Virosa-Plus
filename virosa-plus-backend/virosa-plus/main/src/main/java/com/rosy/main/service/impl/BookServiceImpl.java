package com.rosy.main.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.QueryWrapperUtil;
import com.rosy.main.domain.dto.book.BookQueryRequest;
import com.rosy.main.domain.dto.book.BookQueryRequest;
import com.rosy.main.domain.entity.Book;
import com.rosy.main.domain.entity.Book;
import com.rosy.main.domain.vo.BookVO;
import com.rosy.main.domain.vo.BookVO;
import com.rosy.main.mapper.BookMapper;
import com.rosy.main.service.IBookService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 书籍 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Service
public class BookServiceImpl extends ServiceImpl<BookMapper, Book> implements IBookService {

    @Override
    public BookVO getBookVO(Book book) {
        if (book == null) {
            return null;
        }
        return BeanUtil.copyProperties(book, BookVO.class);
    }

    @Override
    public Wrapper<Book> getQueryWrapper(BookQueryRequest bookQueryRequest) {
        if (bookQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Book> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addCondition(queryWrapper, bookQueryRequest.getId(), Book::getId);
        QueryWrapperUtil.addCondition(queryWrapper, bookQueryRequest.getName(), Book::getName);
        QueryWrapperUtil.addCondition(queryWrapper, bookQueryRequest.getType(), Book::getType);
        QueryWrapperUtil.addCondition(queryWrapper, bookQueryRequest.getContent(), Book::getContent);
        QueryWrapperUtil.addCondition(queryWrapper, bookQueryRequest.getIsPublished(), Book::getIsPublished);
        QueryWrapperUtil.addCondition(queryWrapper, bookQueryRequest.getCreateTime(), Book::getCreateTime);
        QueryWrapperUtil.addCondition(queryWrapper, bookQueryRequest.getUpdateTime(), Book::getUpdateTime);

        // 添加排序条件
        QueryWrapperUtil.addSortCondition(queryWrapper,
                bookQueryRequest.getSortField(),
                bookQueryRequest.getSortOrder(),
                Book::getId);

        return queryWrapper;
    }
}

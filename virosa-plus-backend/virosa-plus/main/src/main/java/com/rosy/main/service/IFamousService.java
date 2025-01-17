package com.rosy.main.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.rosy.main.domain.dto.famous.FamousQueryRequest;
import com.rosy.main.domain.entity.Famous;
import com.rosy.main.domain.entity.Famous;
import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.main.domain.vo.FamousVO;

/**
 * <p>
 * 名人 服务类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
public interface IFamousService extends IService<Famous> {
    FamousVO getFamousVO(Famous famous);

    Wrapper<Famous> getQueryWrapper(FamousQueryRequest famousQueryRequest);
}

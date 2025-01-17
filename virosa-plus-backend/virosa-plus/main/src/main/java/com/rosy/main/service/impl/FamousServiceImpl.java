package com.rosy.main.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.QueryWrapperUtil;
import com.rosy.main.domain.dto.famous.FamousQueryRequest;
import com.rosy.main.domain.dto.famous.FamousQueryRequest;
import com.rosy.main.domain.entity.Famous;
import com.rosy.main.domain.entity.Famous;
import com.rosy.main.domain.vo.FamousVO;
import com.rosy.main.domain.vo.FamousVO;
import com.rosy.main.mapper.FamousMapper;
import com.rosy.main.service.IFamousService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 名人 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Service
public class FamousServiceImpl extends ServiceImpl<FamousMapper, Famous> implements IFamousService {

    @Override
    public FamousVO getFamousVO(Famous famous) {
        if (famous == null) {
            return null;
        }
        return BeanUtil.copyProperties(famous, FamousVO.class);
    }

    @Override
    public Wrapper<Famous> getQueryWrapper(FamousQueryRequest famousQueryRequest) {
        if (famousQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Famous> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addCondition(queryWrapper, famousQueryRequest.getId(), Famous::getId);
        QueryWrapperUtil.addCondition(queryWrapper, famousQueryRequest.getName(), Famous::getName);
        QueryWrapperUtil.addCondition(queryWrapper, famousQueryRequest.getContent(), Famous::getContent);
        QueryWrapperUtil.addCondition(queryWrapper, famousQueryRequest.getIsPublished(), Famous::getIsPublished);
        QueryWrapperUtil.addCondition(queryWrapper, famousQueryRequest.getCreateTime(), Famous::getCreateTime);
        QueryWrapperUtil.addCondition(queryWrapper, famousQueryRequest.getUpdateTime(), Famous::getUpdateTime);

        // 添加排序条件
        QueryWrapperUtil.addSortCondition(queryWrapper,
                famousQueryRequest.getSortField(),
                famousQueryRequest.getSortOrder(),
                Famous::getId);

        return queryWrapper;
    }
}

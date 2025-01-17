package com.rosy.main.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.QueryWrapperUtil;
import com.rosy.main.domain.dto.music.MusicQueryRequest;
import com.rosy.main.domain.entity.Music;
import com.rosy.main.domain.entity.Music;
import com.rosy.main.domain.vo.MusicVO;
import com.rosy.main.mapper.MusicMapper;
import com.rosy.main.service.IMusicService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 音乐 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Service
public class MusicServiceImpl extends ServiceImpl<MusicMapper, Music> implements IMusicService {
    @Override
    public MusicVO getMusicVO(Music music) {
        if (music == null) {
            return null;
        }
        return BeanUtil.copyProperties(music, MusicVO.class);
    }

    @Override
    public Wrapper<Music> getQueryWrapper(MusicQueryRequest musicQueryRequest) {
        if (musicQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Music> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addCondition(queryWrapper, musicQueryRequest.getId(), Music::getId);
        QueryWrapperUtil.addCondition(queryWrapper, musicQueryRequest.getName(), Music::getName);
        QueryWrapperUtil.addCondition(queryWrapper, musicQueryRequest.getArtist(), Music::getArtist);
        QueryWrapperUtil.addCondition(queryWrapper, musicQueryRequest.getAlbum(), Music::getAlbum);
        QueryWrapperUtil.addCondition(queryWrapper, musicQueryRequest.getDuration(), Music::getDuration);
        QueryWrapperUtil.addCondition(queryWrapper, musicQueryRequest.getIsPublished(), Music::getIsPublished);
        QueryWrapperUtil.addCondition(queryWrapper, musicQueryRequest.getCreateTime(), Music::getCreateTime);
        QueryWrapperUtil.addCondition(queryWrapper, musicQueryRequest.getUpdateTime(), Music::getUpdateTime);

        // 添加排序条件
        QueryWrapperUtil.addSortCondition(queryWrapper,
                musicQueryRequest.getSortField(),
                musicQueryRequest.getSortOrder(),
                Music::getId);

        return queryWrapper;
    }

}

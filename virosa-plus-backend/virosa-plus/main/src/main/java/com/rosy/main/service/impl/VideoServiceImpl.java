package com.rosy.main.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.QueryWrapperUtil;
import com.rosy.main.domain.dto.video.VideoQueryRequest;
import com.rosy.main.domain.entity.Video;
import com.rosy.main.domain.entity.Video;
import com.rosy.main.domain.vo.VideoVO;
import com.rosy.main.mapper.VideoMapper;
import com.rosy.main.service.IVideoService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 影视 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Service
public class VideoServiceImpl extends ServiceImpl<VideoMapper, Video> implements IVideoService {
    @Override
    public VideoVO getVideoVO(Video video) {
        if (video == null) {
            return null;
        }
        return BeanUtil.copyProperties(video, VideoVO.class);
    }

    @Override
    public Wrapper<Video> getQueryWrapper(VideoQueryRequest videoQueryRequest) {
        if (videoQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Video> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addCondition(queryWrapper, videoQueryRequest.getId(), Video::getId);
        QueryWrapperUtil.addCondition(queryWrapper, videoQueryRequest.getName(), Video::getName);
        QueryWrapperUtil.addCondition(queryWrapper, videoQueryRequest.getType(), Video::getType);
        QueryWrapperUtil.addCondition(queryWrapper, videoQueryRequest.getContent(), Video::getContent);
        QueryWrapperUtil.addCondition(queryWrapper, videoQueryRequest.getIsPublished(), Video::getIsPublished);
        QueryWrapperUtil.addCondition(queryWrapper, videoQueryRequest.getCreateTime(), Video::getCreateTime);
        QueryWrapperUtil.addCondition(queryWrapper, videoQueryRequest.getUpdateTime(), Video::getUpdateTime);

        // 添加排序条件
        QueryWrapperUtil.addSortCondition(queryWrapper,
                videoQueryRequest.getSortField(),
                videoQueryRequest.getSortOrder(),
                Video::getId);

        return queryWrapper;
    }
}

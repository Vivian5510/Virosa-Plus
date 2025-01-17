package com.rosy.main.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.rosy.main.domain.dto.video.VideoQueryRequest;
import com.rosy.main.domain.entity.Video;
import com.rosy.main.domain.entity.Video;
import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.main.domain.vo.VideoVO;

/**
 * <p>
 * 影视 服务类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
public interface IVideoService extends IService<Video> {
    VideoVO getVideoVO(Video video);

    Wrapper<Video> getQueryWrapper(VideoQueryRequest videoQueryRequest);
}

package com.rosy.main.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.rosy.main.domain.dto.music.MusicQueryRequest;
import com.rosy.main.domain.entity.Music;
import com.rosy.main.domain.entity.Music;
import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.main.domain.vo.MusicVO;

/**
 * <p>
 * 音乐 服务类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
public interface IMusicService extends IService<Music> {
    MusicVO getMusicVO(Music music);

    Wrapper<Music> getQueryWrapper(MusicQueryRequest musicQueryRequest);
}

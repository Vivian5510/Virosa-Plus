package com.rosy.main.service.impl;

import com.rosy.main.domain.entity.Music;
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

}

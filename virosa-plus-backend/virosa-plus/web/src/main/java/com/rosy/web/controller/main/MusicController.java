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
import com.rosy.main.domain.dto.music.MusicAddRequest;
import com.rosy.main.domain.dto.music.MusicQueryRequest;
import com.rosy.main.domain.dto.music.MusicUpdateRequest;
import com.rosy.main.domain.entity.Music;
import com.rosy.main.domain.vo.MusicVO;
import com.rosy.main.service.IMusicService;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 音乐 前端控制器
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@RestController
@RequestMapping("/music")
public class MusicController {
    @Resource
    private IMusicService musicService;

    // region 增删改查

    /**
     * 创建
     */
    @PostMapping("/add")
    @ValidateRequest
    public AjaxResult addMusic(@RequestBody MusicAddRequest musicAddRequest) {
        Music music = new Music();
        BeanUtils.copyProperties(musicAddRequest, music);
        boolean result = musicService.save(music);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(music.getId());
    }

    /**
     * 删除
     */
    @PostMapping("/delete")
    @ValidateRequest
    public AjaxResult deleteMusic(@RequestBody IdRequest idRequest) {
        boolean result = musicService.removeById(idRequest.getId());
        return AjaxResult.success(result);
    }

    /**
     * 更新
     */
    @PostMapping("/update")
    @ValidateRequest
    public AjaxResult updateMusic(@RequestBody MusicUpdateRequest musicUpdateRequest) {
        if (musicUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Music music = BeanUtil.copyProperties(musicUpdateRequest, Music.class);
        boolean result = musicService.updateById(music);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(true);
    }

    /**
     * 根据 id 获取
     */
    @GetMapping("/get")
    @ValidateRequest
    public AjaxResult getMusicById(Long id) {
        Music music = musicService.getById(id);
        ThrowUtils.throwIf(music == null, ErrorCode.NOT_FOUND_ERROR);
        return AjaxResult.success(music);
    }

    /**
     * 根据 id 获取包装类
     */
    @GetMapping("/get/vo")
    @ValidateRequest
    public AjaxResult getMusicVOById(Long id) {
        AjaxResult response = getMusicById(id);
        Music music = (Music) response.get(AjaxResult.DATA_TAG);
        return AjaxResult.success(musicService.getMusicVO(music));
    }

    /**
     * 分页获取列表
     */
    @PostMapping("/list/page")
    @ValidateRequest
    public AjaxResult listMusicByPage(@RequestBody MusicQueryRequest musicQueryRequest) {
        long current = musicQueryRequest.getCurrent();
        long size = musicQueryRequest.getPageSize();
        Page<Music> musicPage = musicService.page(new Page<>(current, size), musicService.getQueryWrapper(musicQueryRequest));
        return AjaxResult.success(musicPage);
    }

    /**
     * 分页获取封装列表
     */
    @PostMapping("/list/page/vo")
    @ValidateRequest
    public AjaxResult listMusicVOByPage(@RequestBody MusicQueryRequest musicQueryRequest) {
        long current = musicQueryRequest.getCurrent();
        long size = musicQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Music> musicPage = musicService.page(new Page<>(current, size), musicService.getQueryWrapper(musicQueryRequest));
        Page<MusicVO> musicVOPage = PageUtils.convert(musicPage, musicService::getMusicVO);
        return AjaxResult.success(musicVOPage);
    }

    // endregion
}

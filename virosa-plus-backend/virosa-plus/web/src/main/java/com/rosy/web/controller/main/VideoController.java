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
import com.rosy.main.domain.dto.video.VideoAddRequest;
import com.rosy.main.domain.dto.video.VideoQueryRequest;
import com.rosy.main.domain.dto.video.VideoUpdateRequest;
import com.rosy.main.domain.entity.Video;
import com.rosy.main.domain.vo.VideoVO;
import com.rosy.main.service.IVideoService;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 影视 前端控制器
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@RestController
@RequestMapping("/video")
public class VideoController {
    @Resource
    private IVideoService videoService;

    // region 增删改查

    /**
     * 创建
     */
    @PostMapping("/add")
    @ValidateRequest
    public AjaxResult addVideo(@RequestBody VideoAddRequest videoAddRequest) {
        Video video = new Video();
        BeanUtils.copyProperties(videoAddRequest, video);
        boolean result = videoService.save(video);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(video.getId());
    }

    /**
     * 删除
     */
    @PostMapping("/delete")
    @ValidateRequest
    public AjaxResult deleteVideo(@RequestBody IdRequest idRequest) {
        boolean result = videoService.removeById(idRequest.getId());
        return AjaxResult.success(result);
    }

    /**
     * 更新
     */
    @PostMapping("/update")
    @ValidateRequest
    public AjaxResult updateVideo(@RequestBody VideoUpdateRequest videoUpdateRequest) {
        if (videoUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Video video = BeanUtil.copyProperties(videoUpdateRequest, Video.class);
        boolean result = videoService.updateById(video);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(true);
    }

    /**
     * 根据 id 获取
     */
    @GetMapping("/get")
    @ValidateRequest
    public AjaxResult getVideoById(Long id) {
        Video video = videoService.getById(id);
        ThrowUtils.throwIf(video == null, ErrorCode.NOT_FOUND_ERROR);
        return AjaxResult.success(video);
    }

    /**
     * 根据 id 获取包装类
     */
    @GetMapping("/get/vo")
    @ValidateRequest
    public AjaxResult getVideoVOById(Long id) {
        AjaxResult response = getVideoById(id);
        Video video = (Video) response.get(AjaxResult.DATA_TAG);
        return AjaxResult.success(videoService.getVideoVO(video));
    }

    /**
     * 分页获取列表
     */
    @PostMapping("/list/page")
    @ValidateRequest
    public AjaxResult listVideoByPage(@RequestBody VideoQueryRequest videoQueryRequest) {
        long current = videoQueryRequest.getCurrent();
        long size = videoQueryRequest.getPageSize();
        Page<Video> videoPage = videoService.page(new Page<>(current, size), videoService.getQueryWrapper(videoQueryRequest));
        return AjaxResult.success(videoPage);
    }

    /**
     * 分页获取封装列表
     */
    @PostMapping("/list/page/vo")
    @ValidateRequest
    public AjaxResult listVideoVOByPage(@RequestBody VideoQueryRequest videoQueryRequest) {
        long current = videoQueryRequest.getCurrent();
        long size = videoQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Video> videoPage = videoService.page(new Page<>(current, size), videoService.getQueryWrapper(videoQueryRequest));
        Page<VideoVO> videoVOPage = PageUtils.convert(videoPage, videoService::getVideoVO);
        return AjaxResult.success(videoVOPage);
    }

    // endregion
}

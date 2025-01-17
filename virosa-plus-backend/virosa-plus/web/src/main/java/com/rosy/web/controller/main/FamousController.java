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
import com.rosy.main.domain.dto.famous.FamousAddRequest;
import com.rosy.main.domain.dto.famous.FamousQueryRequest;
import com.rosy.main.domain.dto.famous.FamousUpdateRequest;
import com.rosy.main.domain.entity.Famous;
import com.rosy.main.domain.vo.FamousVO;
import com.rosy.main.service.IFamousService;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 名人 前端控制器
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@RestController
@RequestMapping("/famous")
public class FamousController {
    @Resource
    private IFamousService famousService;

    // region 增删改查

    /**
     * 创建
     */
    @PostMapping("/add")
    @ValidateRequest
    public AjaxResult addFamous(@RequestBody FamousAddRequest famousAddRequest) {
        Famous famous = new Famous();
        BeanUtils.copyProperties(famousAddRequest, famous);
        boolean result = famousService.save(famous);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(famous.getId());
    }

    /**
     * 删除
     */
    @PostMapping("/delete")
    @ValidateRequest
    public AjaxResult deleteFamous(@RequestBody IdRequest idRequest) {
        boolean result = famousService.removeById(idRequest.getId());
        return AjaxResult.success(result);
    }

    /**
     * 更新
     */
    @PostMapping("/update")
    @ValidateRequest
    public AjaxResult updateFamous(@RequestBody FamousUpdateRequest famousUpdateRequest) {
        if (famousUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Famous famous = BeanUtil.copyProperties(famousUpdateRequest, Famous.class);
        boolean result = famousService.updateById(famous);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return AjaxResult.success(true);
    }

    /**
     * 根据 id 获取
     */
    @GetMapping("/get")
    @ValidateRequest
    public AjaxResult getFamousById(Long id) {
        Famous famous = famousService.getById(id);
        ThrowUtils.throwIf(famous == null, ErrorCode.NOT_FOUND_ERROR);
        return AjaxResult.success(famous);
    }

    /**
     * 根据 id 获取包装类
     */
    @GetMapping("/get/vo")
    @ValidateRequest
    public AjaxResult getFamousVOById(Long id) {
        AjaxResult response = getFamousById(id);
        Famous famous = (Famous) response.get(AjaxResult.DATA_TAG);
        return AjaxResult.success(famousService.getFamousVO(famous));
    }

    /**
     * 分页获取列表
     */
    @PostMapping("/list/page")
    @ValidateRequest
    public AjaxResult listFamousByPage(@RequestBody FamousQueryRequest famousQueryRequest) {
        long current = famousQueryRequest.getCurrent();
        long size = famousQueryRequest.getPageSize();
        Page<Famous> famousPage = famousService.page(new Page<>(current, size), famousService.getQueryWrapper(famousQueryRequest));
        return AjaxResult.success(famousPage);
    }

    /**
     * 分页获取封装列表
     */
    @PostMapping("/list/page/vo")
    @ValidateRequest
    public AjaxResult listFamousVOByPage(@RequestBody FamousQueryRequest famousQueryRequest) {
        long current = famousQueryRequest.getCurrent();
        long size = famousQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Famous> famousPage = famousService.page(new Page<>(current, size), famousService.getQueryWrapper(famousQueryRequest));
        Page<FamousVO> famousVOPage = PageUtils.convert(famousPage, famousService::getFamousVO);
        return AjaxResult.success(famousVOPage);
    }

    // endregion
}

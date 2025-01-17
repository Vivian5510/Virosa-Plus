package com.rosy.main.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.QueryWrapperUtil;
import com.rosy.main.domain.dto.node.NodeQueryRequest;
import com.rosy.main.domain.dto.node.NodeQueryRequest;
import com.rosy.main.domain.entity.Node;
import com.rosy.main.domain.entity.Node;
import com.rosy.main.domain.entity.Node;
import com.rosy.main.domain.vo.NodeVO;
import com.rosy.main.domain.vo.NodeVO;
import com.rosy.main.mapper.NodeMapper;
import com.rosy.main.service.INodeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 节点 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Service
public class NodeServiceImpl extends ServiceImpl<NodeMapper, Node> implements INodeService {
    @Override
    public NodeVO getNodeVO(Node node) {
        if (node == null) {
            return null;
        }
        return BeanUtil.copyProperties(node, NodeVO.class);
    }

    @Override
    public Wrapper<Node> getQueryWrapper(NodeQueryRequest nodeQueryRequest) {
        if (nodeQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Node> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addCondition(queryWrapper, nodeQueryRequest.getId(), Node::getId);
        QueryWrapperUtil.addCondition(queryWrapper, nodeQueryRequest.getName(), Node::getName);
        QueryWrapperUtil.addCondition(queryWrapper, nodeQueryRequest.getType(), Node::getType);
        QueryWrapperUtil.addCondition(queryWrapper, nodeQueryRequest.getParentId(), Node::getParentId);
        QueryWrapperUtil.addCondition(queryWrapper, nodeQueryRequest.getStatus(), Node::getStatus);
        QueryWrapperUtil.addCondition(queryWrapper, nodeQueryRequest.getCreateTime(), Node::getCreateTime);
        QueryWrapperUtil.addCondition(queryWrapper, nodeQueryRequest.getUpdateTime(), Node::getUpdateTime);

        // 添加排序条件
        QueryWrapperUtil.addSortCondition(queryWrapper,
                nodeQueryRequest.getSortField(),
                nodeQueryRequest.getSortOrder(),
                Node::getId);

        return queryWrapper;
    }
}

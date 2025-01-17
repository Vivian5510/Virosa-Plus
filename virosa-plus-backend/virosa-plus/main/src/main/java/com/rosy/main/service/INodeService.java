package com.rosy.main.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.rosy.main.domain.dto.node.NodeQueryRequest;
import com.rosy.main.domain.entity.Node;
import com.baomidou.mybatisplus.extension.service.IService;
import com.rosy.main.domain.vo.NodeVO;

/**
 * <p>
 * 节点 服务类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
public interface INodeService extends IService<Node> {
    NodeVO getNodeVO(Node node);

    Wrapper<Node> getQueryWrapper(NodeQueryRequest nodeQueryRequest);
}

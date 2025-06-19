/**
 * 节点类型定义
 */

// 节点类型枚举
export enum NodeType {
    DIRECTORY = 'directory',
    FILE = 'file',
}

// 节点状态枚举
export enum NodeStatus {
    DISABLED = 0,
    ENABLED = 1,
}

// 节点接口
export interface INodeItem {
    id: number;
    name: string;
    type: string; // 后端返回的类型是字符串 'directory'或'file'
    parentId: number;
    articleId?: number;
    status: number;
    orderNum?: number;
    updateTime: string;
    createTime: string;
    version?: number;
    isDeleted?: number;
    children?: INodeItem[];
}

// 树形节点接口，用于TreeView组件
export interface ITreeNode {
    id: string;
    name: string;
    type: NodeType;
    parentId: string | null;
    articleId?: string | null;
    children?: ITreeNode[];
}

// 节点查询参数接口
export interface INodeQueryParams {
    pageNum?: number;
    pageSize?: number;
    title?: string;
    parentId?: string | number | null;
    articleId?: string | number | null;
}

// 创建节点请求接口
export interface INodeCreateRequest {
    name: string;
    type: NodeType;
    parentId?: string | number | null;
    articleId?: string | number | null;
    orderNum?: number;
}

// 更新节点请求接口
export interface INodeUpdateRequest {
    id: string | number;
    name?: string;
    type?: NodeType;
    parentId?: string | number | null;
    articleId?: string | number | null;
    orderNum?: number;
} 
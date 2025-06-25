# API迁移指南

## 概述

本文档描述了从旧版API迁移到新版OpenAPI生成的API客户端的过程。新版API位于`src/api/generated`目录下，提供了更完整的类型定义和功能。

## 变更内容

1. 使用统一的API工厂函数从`src/api/generated`导入
2. 类型定义更新 - 旧版API的请求/响应类型已更新
3. API方法名称变更 - 一些方法名称已变更为更加语义化的名称
4. 引入服务层封装 - 新增`apiService.ts`提供更友好的API接口

## 如何迁移

### 导入方式变更

**旧版:**
```typescript
import { articleApi, bookApi } from '~/composables/http'
```

**新版(直接使用API):**
```typescript
import { articleApi, nodeApi, defaultApi } from '~/composables/http'
```

**新版(推荐使用服务层):**
```typescript
import { ArticleService, MessageService } from '~/composables/apiService'
```

### API服务层使用示例

**添加留言:**
```typescript
// 旧版API
messageApi.addMessage(data).then(res => {
  // 处理响应
})

// 新版API服务
MessageService.addMessage(data).then(res => {
  // 处理响应
})
```

**获取文章:**
```typescript
// 旧版API
articleApi.getArticleVOById(id).then(res => {
  // 处理响应
})

// 新版API服务
ArticleService.getArticleById(id).then(res => {
  // 处理响应
})
```

### API方法变更对照表

| 旧方法名 | 新方法名 | 服务层方法 | 说明 |
|---------|---------|---------|------|
| `articleApi.getArticleVOById(id)` | `articleApi.getArticleById(id)` | `ArticleService.getArticleById(id)` | 获取文章详情 |
| `articleApi.listArticleVOByPage(query)` | `articleApi.page3(query)` | `ArticleService.listArticles(query)` | 分页获取文章列表 |
| `messageApi.listMessageVOByPage(query)` | `messageApi.page1(query)` | `MessageService.listMessages(query)` | 分页获取消息列表 |
| `messageApi.addMessage(data)` | `messageApi.add1(data)` | `MessageService.addMessage(data)` | 添加消息 |
| `issueApi.listIssueVOByPage(query)` | `issueApi.page2(query)` | `IssueService.listIssues(query)` | 分页获取问题列表 |
| `nodeApi.listNodeVOByPage(query)` | `nodeApi.page(query)` | `NodeService.listNodes(query)` | 分页获取节点列表 |
| `http.post('/node/get/file/tree')` | `nodeApi.getFileTree()` | `NodeService.getFileTree()` | 获取文件树 |

### 删除的API

以下API已在新版中移除：
- `bookApi`
- `famousApi`
- `musicApi`
- `videoApi`

如果需要使用这些API，需要由开发团队根据后端实际情况重新添加。

## 参数类型变更

**旧版:**
```typescript
interface ArticleQueryRequest {
  current?: number;
  pageSize?: number;
  sortField?: string;
  // ...
}
```

**新版:**
```typescript
interface ArticleQueryReqVO {
  pageNum?: number;  // 注意：current 改为 pageNum
  pageSize?: number;
  title?: string;
  // ...
}
```

## 服务层封装

我们添加了`apiService.ts`文件，它提供了更友好的API服务封装：

```typescript
// 获取文章列表
ArticleService.listArticles({
  pageNum: 1,
  pageSize: 10,
  title: '搜索关键词'
})

// 添加留言
MessageService.addMessage({
  content: '留言内容'
})

// 获取文件树
NodeService.getFileTree()
```

服务层的优势：
1. 简化API调用，提供更直观的方法名
2. 隔离具体API实现，便于未来可能的API变更
3. 集中管理API请求逻辑，方便添加通用拦截器和处理

## 兼容性处理

为了保障平滑迁移，我们保留了旧版API作为兼容层：

```typescript
// 可以通过legacy命名空间访问旧版API
import { legacy } from '@/api'

// 使用旧版API
legacy.ArticleControllerApi
```

## 最佳实践

1. 优先使用`apiService.ts`中提供的服务
2. 对于未封装的API，可以使用`http.ts`中导出的API实例
3. 使用TypeScript提供的类型检查确保参数正确
4. 检查API响应结构，确保正确处理data字段

## 问题排查

如遇到API相关问题：

1. 检查请求参数类型是否符合新版API的要求
2. 确认API路径和方法名称是否正确
3. 查看控制台网络请求，检查错误响应
4. 对照后端Swagger文档，确认API是否存在 
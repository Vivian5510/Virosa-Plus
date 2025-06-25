# Virosa-Plus-UI

前端UI项目，基于Vue 3和TypeScript。

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式运行
pnpm dev
```

## 构建

```bash
# 生产环境构建
pnpm build
```

## API迁移

项目已完成从旧版API到新版OpenAPI生成的API客户端的迁移。新版API提供了更完整的类型定义和功能。

详情请参阅：[API迁移指南](./docs/api-migration.md)

## 项目结构

```
src/
├── api/             # API相关
│   ├── generated/   # 新生成的API客户端
│   └── ...
├── components/      # 组件
├── composables/     # 组合式函数
├── layouts/         # 布局
├── pages/           # 页面
├── plugins/         # 插件
└── styles/          # 样式
```

## 环境变量

项目使用`.env`文件管理环境变量：

- `VITE_API_BASE_URL`: API基础URL
# 🌌 灵思宇宙 - 个人数字花园

> 个人知识管理系统 × 博客展示平台 × 内容创作空间

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)[![Vue3](https://img.shields.io/badge/vue-3.4.21-%234FC08D?logo=vue.js)](https://vuejs.org/)[![TypeScript](https://img.shields.io/badge/typescript-5.0.4-%233178C6?logo=typescript)](https://www.typescriptlang.org/)[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.0-%236DB33F?logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)[![MySQL](https://img.shields.io/badge/MySQL-8.0-%234479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)[![Redis](https://img.shields.io/badge/Redis-7.0-%23D92D2E?logo=redis&logoColor=white)](https://redis.io/)[![MyBatis Plus](https://img.shields.io/badge/MyBatis%20Plus-%232B2B2B?logo=python&logoColor=white)](https://mybatis.plus/)

<p align="center">
  <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" width="400" alt="digital-garden">
</p>

## 📋 项目简介

灵思宇宙是一个集知识管理、内容创作和个人展示于一体的数字平台。该项目采用前后端分离架构，提供了丰富的内容组织和展示功能，帮助用户构建自己的数字知识花园。

## 🚀 核心功能

### 📝 内容管理
- 支持Markdown格式的笔记和文章创作
- 标签和分类系统，便于内容组织
- 全文检索功能，快速定位内容

### 🔍 知识管理
- 知识关联图谱，展示内容之间的联系
- 收藏和书签功能，整理重要资源
- 学习进度追踪，规划知识路径

### 🎨 个性化展示
- 自定义主题和布局
- 多样化的内容卡片设计
- 响应式界面，适配不同设备

### 💬 社交互动
- 评论系统，促进交流讨论
- 访客留言功能
- 内容分享到社交媒体

## 🛠️ 技术架构

### 前端
- **用户界面**：基于Vue 3.4+、TypeScript、Vite构建
- **UI框架**：TailwindCSS、UnoCSS原子化CSS
- **状态管理**：Pinia
- **路由系统**：Vue Router
- **特效组件**：集成粒子效果、动画库

### 后台管理
- **框架**：React 18.3、TypeScript
- **UI组件**：Material UI 6.3
- **数据展示**：集成表格、图表、日历等组件
- **富文本编辑**：TipTap编辑器

### 后端
- **开发语言**：Java 18
- **框架**：Spring Boot 3.4.0
- **数据访问**：MyBatis Plus 3.5.9
- **数据库**：MySQL 8.0
- **缓存**：Redis
- **安全认证**：JWT令牌
- **存储服务**：支持阿里云OSS

## 📦 项目结构

```
📦 virosa-plus
├── 📂 virosa-plus-frontend       # 前端代码
│   ├── 📂 virosa-plus-ui         # 用户前台界面
│   └── 📂 virosa-plus-admin      # 管理后台界面
└── 📂 virosa-plus-backend        # 后端代码
    └── 📂 virosa-plus
        ├── 📂 common             # 公共模块
        ├── 📂 framework          # 框架模块
        ├── 📂 web                # Web接口模块
        └── 📂 main               # 主应用模块
```

## 🚀 快速开始

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/your-repo/virosa-plus.git
cd virosa-plus
```

2. **启动前端**
```bash
cd virosa-plus-frontend/virosa-plus-ui
pnpm install
pnpm dev
```

3. **启动后端**
```bash
cd virosa-plus-backend/virosa-plus
mvn spring-boot:run
```

### 部署

1. **前端构建**
```bash
cd virosa-plus-frontend/virosa-plus-ui
pnpm build
```

2. **后端打包**
```bash
cd virosa-plus-backend/virosa-plus
mvn clean package
```

## 🤝 参与贡献

欢迎通过以下方式参与项目：
1. 提交Issue报告问题或建议新功能
2. 提交Pull Request贡献代码
3. 完善文档和使用示例

## 📝 TODO列表
- [ ] 响应式布局优化，完善移动端适配
- [ ] 知识图谱可视化功能增强
- [ ] 内容导入/导出功能
- [ ] 增加更多第三方集成

## 📄 许可证
[MIT 许可证](LICENSE) © 2024

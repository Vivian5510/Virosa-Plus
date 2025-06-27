# 代码清理指南

## 清理说明

在执行代码清理过程中，以下目录由于未在路由配置中使用，已被删除：

### 已清理的目录
- `src/sections/user` ✓
- `src/sections/product` ✓
- `src/sections/invoice` ✓
- `src/sections/order` ✓
- `src/sections/job` ✓
- `src/sections/tour` ✓
- `src/sections/home` ✓
- `src/sections/mail` ✓
- `src/sections/chat` ✓
- `src/sections/kanban` ✓
- `src/sections/calendar` ✓
- `src/sections/file-manager` ✓
- `src/sections/permission` ✓
- `src/sections/overview` ✓ (注意：`overview/app` 已恢复，作为首页宣传页面)
- `src/sections/account` ✓
- `src/sections/_examples` ✓ (示例组件)
- `src/sections/pricing` ✓
- `src/sections/payment` ✓
- `src/sections/checkout` ✓
- `src/sections/address` ✓
- `src/sections/maintenance` ✓
- `src/sections/faqs` ✓
- `src/sections/contact` ✓
- `src/sections/blank` ✓
- `src/sections/about` ✓
- `src/sections/coming-soon` ✓

- `src/pages/dashboard/user` ✓
- `src/pages/dashboard/product` ✓
- `src/pages/dashboard/invoice` ✓
- `src/pages/dashboard/order` ✓
- `src/pages/dashboard/job` ✓
- `src/pages/dashboard/mail` ✓
- `src/pages/dashboard/chat` ✓
- `src/pages/dashboard/kanban` ✓
- `src/pages/dashboard/calendar` ✓
- `src/pages/dashboard/file-manager` ✓
- `src/pages/dashboard/permission` ✓
- `src/pages/dashboard/account` ✓
- `src/pages/dashboard/tour` ✓
- `src/pages/dashboard/ecommerce` ✓
- `src/pages/dashboard/analytics` ✓
- `src/pages/dashboard/banking` ✓
- `src/pages/dashboard/booking` ✓
- `src/pages/dashboard/file` ✓
- `src/pages/dashboard/course` ✓
- `src/pages/dashboard/blank` ✓
- `src/pages/dashboard/params` ✓

- `src/pages/product` ✓（已删除）
- `src/pages/components` ✓（已删除所有组件示例页面）
- `src/pages/pricing` ✓
- `src/pages/payment` ✓
- `src/pages/auth-demo` ✓（已删除认证演示页面）
- `src/auth/view/auth-demo` ✓（已删除认证演示组件）
- `src/pages/maintenance` ✓
- `src/pages/faqs` ✓
- `src/pages/contact-us` ✓
- `src/pages/blank` ✓
- `src/pages/about-us` ✓
- `src/pages/coming-soon` ✓
- `src/pages/auth/amplify` ✓（删除额外的认证方式，只保留JWT）
- `src/pages/auth/firebase` ✓
- `src/pages/auth/auth0` ✓
- `src/pages/auth/supabase` ✓

- `src/auth/context/amplify` ✓（删除额外的认证上下文，只保留JWT）
- `src/auth/context/firebase` ✓
- `src/auth/context/auth0` ✓
- `src/auth/context/supabase` ✓
- `src/auth/view/amplify` ✓（删除额外的认证视图组件，只保留JWT）
- `src/auth/view/firebase` ✓
- `src/auth/view/auth0` ✓
- `src/auth/view/supabase` ✓

### 已清理的路由配置文件
- `src/routes/sections/components.tsx` ✓（已删除组件路由配置）
- `src/routes/sections/auth-demo.tsx` ✓（已删除认证演示路由配置）
- `src/routes/sections/auth.tsx` ✓（已优化，只保留JWT认证相关路由）

### 已修改的文件
- `src/app.tsx` ✓（移除了多种认证方式的引用，只保留JWT）
- `src/layouts/components/sign-out-button.tsx` ✓（移除了多种认证方式的引用，只保留JWT）

## 清理原因

通过分析路由配置文件 (`src/routes/sections/dashboard.tsx`, `src/routes/sections/main.tsx` 等)发现，项目中的许多页面组件和section组件未被实际路由配置引用。

当前项目只使用了以下路由：
- 仪表板首页 (`/dashboard`) - 使用 `overview/app/view` 作为首页宣传页面
- 博客管理 (`/dashboard/post/*`)
- 目录管理 (`/dashboard/directory/*`)
- JWT认证页面（登录/注册）

根据 `global-config.ts` 配置，当前项目仅使用 JWT 认证方式，其他认证方式（Amplify、Firebase、Auth0、Supabase）均未使用，因此已删除相关组件和页面。

其他在 `paths.ts` 中定义的路径没有在路由配置中使用，相应的页面组件和section组件已被删除以减小项目体积。

## 临时解决方案

为了解决引用已删除组件的问题，我们在`paths.ts`中保留了一些路径定义，以确保代码能够正常编译。这些临时定义可以在将来完全移除对这些路径的引用后删除。
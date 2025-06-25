# OpenAPI Generator 使用说明

## 基本用法

1. 配置文件中已设置使用后端Swagger文档URL：`http://localhost:9090/api/v3/api-docs`
2. 执行以下命令生成 API 客户端代码：

```bash
# 查看帮助
pnpm openapi:help

# 生成API客户端代码
pnpm openapi:generate

# 或使用构建命令（先清理再生成）
pnpm openapi:build

# Windows系统专用命令
pnpm openapi:build:win
```

## 配置文件说明

项目中有两个配置文件：

1. `openapitools.json`：用于配置 OpenAPI Generator CLI 工具本身
2. `.openapi-generator-config.json`：用于配置代码生成选项，包含：
   - `inputSpec`: 可以是本地文件路径或远程URL（当前配置为 `http://localhost:9090/api/v3/api-docs`）
   - `generatorName`: 使用的生成器（当前为 typescript-axios）
   - `output`: 生成代码的输出目录

## 系统兼容性

项目提供了两种清理和构建命令：

- 通用命令（使用rimraf）：`pnpm openapi:build`
- Windows专用命令：`pnpm openapi:build:win`

Windows用户可以使用任意一种命令，两者都兼容Windows系统。

## 自定义生成命令

如果需要临时覆盖配置文件中的设置，可以直接使用命令行：

```bash
# 使用远程URL
npx openapi-generator-cli generate -i http://localhost:9090/api/v3/api-docs -g typescript-axios -o ./src/api/your-custom-output

# 使用本地文件
npx openapi-generator-cli generate -i ./your-api-spec.yaml -g typescript-axios -o ./src/api/your-custom-output
```

## 注意事项

1. 使用远程URL时，请确保后端服务正在运行且可访问
2. 如果后端地址变更，需要相应更新 `.openapi-generator-config.json` 中的 `inputSpec` 值
3. 每次后端API发生变化时，需要重新生成客户端代码
4. 生成的代码位于 `src/api/generated` 目录下
5. 建议不要直接修改生成的代码，而是在其基础上进行扩展
6. Windows系统请优先使用 `pnpm openapi:build:win` 命令

## 在代码中使用生成的API

```typescript
// 导入API
import { DefaultApi } from '@/api/generated';
import { Configuration } from '@/api/generated';

// 创建API实例
const config = new Configuration({
  basePath: 'http://localhost:9090',  // 设置为后端服务地址
  // 可以添加认证信息等
});

const api = new DefaultApi(config);

// 使用API
async function fetchData() {
  try {
    const response = await api.getUsers();
    console.log(response.data);
  } catch (error) {
    console.error('API调用失败', error);
  }
}
``` 
---
sidebar_position: 2
---

# 部署指南

了解如何将你的 Docusaurus 站点部署到各种平台。

## 静态部署

### 构建静态文件

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm serve
```

构建后的文件将在 `build/` 目录中。

## GitHub Pages

### 自动部署

1. 在 `docusaurus.config.ts` 中配置：

```typescript title="docusaurus.config.ts"
const config = {
  title: 'Oadin Docs',
  url: 'https://DigitalChinaOpenSource.github.io',
  baseUrl: '/oadin-docs/',
  organizationName: 'DigitalChinaOpenSource',
  projectName: 'oadin-docs',
  trailingSlash: false,
  // ...
};
```

2. 使用 GitHub Actions 自动部署：

```yaml title=".github/workflows/deploy.yml"
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build website
        run: pnpm build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

## Vercel

1. 连接 GitHub 仓库到 Vercel
2. 设置构建配置：
   - **构建命令**: `pnpm build`
   - **输出目录**: `build`
   - **安装命令**: `pnpm install`

## Netlify

1. 连接 GitHub 仓库到 Netlify
2. 设置构建配置：
   - **构建命令**: `pnpm build`
   - **发布目录**: `build`
   - **包管理器**: `pnpm`

## 自定义域名

### DNS 配置

1. 添加 CNAME 记录指向部署平台
2. 在 `static` 目录创建 `CNAME` 文件：

```text title="static/CNAME"
your-domain.com
```

### HTTPS 配置

大多数托管平台都会自动为你配置 SSL 证书。

## 性能优化

### 预加载

```typescript title="docusaurus.config.ts"
const config = {
  // 启用预加载
  presets: [
    [
      'classic',
      {
        docs: {
          // 预加载相关文档
          preloadHover: true,
        },
      },
    ],
  ],
};
```

### 压缩配置

Docusaurus 会自动压缩和优化资源文件。

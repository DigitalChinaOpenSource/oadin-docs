# Oadin Docs - 现代化文档系统

基于 [Docusaurus 3](https://docusaurus.io/) 构建的现代化静态文档站点，采用 TypeScript + pnpm + CSS 技术栈。

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0
- **pnpm**: >= 9.0 (推荐使用 pnpm 作为包管理器)

### 安装依赖

```bash
# 使用 pnpm 安装依赖（已配置淘宝镜像源）
pnpm install
```

### 本地开发

```bash
# 启动开发服务器
pnpm start

# 指定端口启动
pnpm start --port 3000
```

开发服务器启动后会自动打开浏览器，大部分更改会实时生效，无需重启服务器。

## 📖 文档编写

### 创建新文档

1. 在 `docs/` 目录下创建 `.md` 或 `.mdx` 文件
2. 文件头部添加 frontmatter：

```markdown
---
sidebar_position: 1
title: 文档标题
description: 文档描述
---

# 文档标题

文档内容...
```

### 文档结构

```
docs/
├── intro.md                 # 介绍页面
├── tutorial-basics/         # 基础教程目录
│   ├── create-a-page.md
│   └── markdown-features.mdx
└── advanced/                # 高级功能目录
    ├── theming.md
    └── deployment.md
```

### 添加图片和资源

1. 将图片放入 `static/img/` 目录
2. 在文档中引用：

```markdown
![图片描述](/img/your-image.png)
```

## 🎨 样式自定义

### 修改主题色彩

编辑 `src/css/custom.css` 中的 CSS 变量：

```css
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  /* 更多颜色变量... */
}
```

### 添加自定义样式

在 `src/css/custom.css` 中添加你的自定义 CSS 样式。

## 🏗️ 构建与部署

### 生产构建

```bash
# 构建静态文件
pnpm build
```

构建产物将生成在 `build/` 目录中，可以部署到任何静态文件托管服务。

### 本地预览构建结果

```bash
# 预览构建后的站点
pnpm serve
```

### 部署选项

#### 1. GitHub Pages

```bash
# 设置 GitHub 用户名并部署
GIT_USER=<你的GitHub用户名> pnpm deploy
```

#### 2. Vercel

1. 连接 GitHub 仓库到 Vercel
2. 构建命令：`pnpm build`
3. 输出目录：`build`

#### 3. Netlify

1. 连接 GitHub 仓库到 Netlify
2. 构建命令：`pnpm build`
3. 发布目录：`build`

#### 4. 静态文件服务器

将 `build/` 目录的内容上传到任何静态文件托管服务（如 Nginx、Apache 等）。

## ⚙️ 配置说明

### 主配置文件

`docusaurus.config.ts` - 站点的主要配置文件：

```typescript
const config: Config = {
  title: 'Oadin Docs',
  tagline: '基于 Docusaurus 的现代化文档系统',
  favicon: 'img/favicon.ico',
  url: 'https://your-domain.com',
  baseUrl: '/',
  // 更多配置...
};
```

### 侧边栏配置

`sidebars.ts` - 配置文档的侧边栏结构：

```typescript
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: '教程',
      items: ['tutorial-basics/create-a-page'],
    },
  ],
};
```

## 🛠️ 开发工具

### TypeScript 检查

```bash
# 运行 TypeScript 类型检查
pnpm typecheck
```

### 清理缓存

```bash
# 清理 Docusaurus 缓存
pnpm clear
```

### 生成翻译文件

```bash
# 生成翻译模板
pnpm write-translations
```

## 📁 项目结构

```
oadin-docs/
├── docs/                    # 文档内容
├── src/                     # 源代码
│   ├── css/                # 样式文件
│   ├── pages/              # 自定义页面
│   └── components/         # React 组件
├── static/                  # 静态资源
├── docusaurus.config.ts     # 主配置文件
├── sidebars.ts             # 侧边栏配置
├── package.json            # 依赖配置
└── README.md               # 项目说明
```

## 🔧 常见问题

### 1. 端口被占用

```bash
# 指定其他端口启动
pnpm start --port 3001
```

### 2. 构建失败

```bash
# 清理缓存后重试
pnpm clear && pnpm build
```

### 3. 样式不生效

检查 `src/css/custom.css` 文件是否正确配置在 `docusaurus.config.ts` 中。

### 4. 文档路径问题

确保文档文件的路径和 `sidebars.ts` 中的配置一致。

## 📚 相关资源

- [Docusaurus 官方文档](https://docusaurus.io/docs)
- [Markdown 语法指南](https://www.markdownguide.org/)
- [MDX 文档](https://mdxjs.com/)
- [Infima CSS 框架](https://infima.dev/)

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

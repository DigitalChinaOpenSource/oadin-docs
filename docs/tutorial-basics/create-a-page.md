---
sidebar_position: 1
---

# 创建页面

在 `src/pages` 目录下添加 **Markdown 或 React** 文件来创建**独立页面**：

- `src/pages/index.js` → `localhost:3000/`
- `src/pages/foo.md` → `localhost:3000/foo`
- `src/pages/foo/bar.js` → `localhost:3000/foo/bar`

## 创建你的第一个 React 页面

在 `src/pages/my-react-page.js` 创建文件：

```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>我的 React 页面</h1>
      <p>这是一个 React 页面</p>
    </Layout>
  );
}
```

现在可以在 [http://localhost:3000/my-react-page](http://localhost:3000/my-react-page) 访问新页面。

## 创建你的第一个 Markdown 页面

在 `src/pages/my-markdown-page.md` 创建文件：

```mdx title="src/pages/my-markdown-page.md"
# 我的 Markdown 页面

这是一个 Markdown 页面
```

现在可以在 [http://localhost:3000/my-markdown-page](http://localhost:3000/my-markdown-page) 访问新页面。

## 页面特性

- **路由自动生成**：基于文件路径自动生成路由
- **支持多种格式**：支持 `.md`、`.mdx`、`.js`、`.jsx`、`.ts`、`.tsx`
- **完整的 React 支持**：可以在页面中使用任何 React 组件
- **布局系统**：使用 `@theme/Layout` 获得统一的页面布局

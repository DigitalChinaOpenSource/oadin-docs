---
sidebar_position: 1
---

# 主题配置

了解如何自定义 Docusaurus 主题来满足你的需求。

## 颜色主题

### 自定义主题色

在 `src/css/custom.css` 中修改 CSS 变量：

```css title="src/css/custom.css"
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}
```

### 深色模式配置

```css title="src/css/custom.css"
[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}
```

## 导航栏配置

在 `docusaurus.config.ts` 中配置导航栏：

```typescript title="docusaurus.config.ts"
navbar: {
  title: 'Oadin Docs',
  logo: {
    alt: 'Oadin Docs Logo',
    src: 'img/logo.svg',
  },
  items: [
    {
      type: 'docSidebar',
      sidebarId: 'tutorialSidebar',
      position: 'left',
      label: '文档',
    },
    {to: '/blog', label: '博客', position: 'left'},
    {
      href: 'https://github.com/DigitalChinaOpenSource/oadin-docs',
      label: 'GitHub',
      position: 'right',
    },
  ],
},
```

## 页脚配置

自定义页脚链接和版权信息：

```typescript title="docusaurus.config.ts"
footer: {
  style: 'dark',
  links: [
    {
      title: '文档',
      items: [
        {
          label: '快速开始',
          to: '/docs/intro',
        },
      ],
    },
    {
      title: '社区',
      items: [
        {
          label: 'GitHub',
          href: 'https://github.com/DigitalChinaOpenSource/oadin-docs',
        },
      ],
    },
  ],
  copyright: `版权所有 © ${new Date().getFullYear()} Oadin Docs 项目。`,
},
```

import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    // 1. 架构概述 - 帮助用户理解 Oadin 解决的问题
    "architecture",

    // 2. 快速入门 - 让用户快速上手使用
    "quickstart",

    // 3. 构建与部署 - 详细的部署指南
    "build-deployment",

    // 4. SDK 指南 - 开发者集成参考
    "sdk-guide",

    // 5. API 文档 - 完整的接口参考
    "api-and-extension-capabilities",

    // 6. 升级指南 - 版本变更和迁移
    "upgrade-guidance",

    // 7. 常见问题 - 故障排除
    "faq-troubleshooting-guide",

    // 8. 社区贡献 - 参与项目
    "community-and-contribution",
  ],
};

export default sidebars;

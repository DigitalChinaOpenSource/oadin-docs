import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// 此代码运行在 Node.js 环境中 - 不要在此使用客户端代码（浏览器 API、JSX...）

const config: Config = {
  title: 'Oadin Docs',
  tagline: '基于 Docusaurus 的现代化文档系统',
  favicon: 'img/logo.png',

  // 未来功能标志，参见 https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // 提高与即将推出的 Docusaurus v4 的兼容性
  },

  // 在此处设置站点的生产环境 URL
  url: 'https://DigitalChinaOpenSource.github.io',
  // 设置站点服务的 /<baseUrl>/ 路径名
  // 对于 GitHub pages 部署，通常是 '/<projectName>/'
  baseUrl: '/',

  // GitHub pages 部署配置
  // 如果你不使用 GitHub pages，则不需要这些配置
  organizationName: 'DigitalChinaOpenSource', // 通常是你的 GitHub 组织/用户名
  projectName: 'oadin-docs', // 通常是你的仓库名

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  
  // 配置路由重定向，将首页直接跳转到文档页面


  // 即使你不使用国际化，也可以使用此字段设置有用的元数据，如 html lang
  // 例如，如果你的站点是中文的，你可能想将 "en" 替换为 "zh-Hans"
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // 请将此更改为你的仓库地址
          // 移除此配置可移除"编辑此页面"链接
          editUrl:
            'https://github.com/DigitalChinaOpenSource/oadin-docs/tree/main/',
          routeBasePath: 'docs',
          path: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // 将 /docs 路径重定向到 /docs/intro
        redirects: [
          {
            from: '/docs',
            to: '/docs/intro',
          },
        ],
      },
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: "/docs",
        searchBarPosition: "right"
      },
    ],
  ],

  themeConfig: {
    // 替换为你的项目的社交卡片
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Oadin文档中心',
      logo: {
        alt: 'Oadin Docs Logo',
        src: 'img/logo.png',
        srcDark: 'img/logo.png', // 深色主题下的 Logo
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        {
          href: 'https://github.com/DigitalChinaOpenSource/oadin-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
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
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/DigitalChinaOpenSource/oadin-docs',
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,


};

export default config;

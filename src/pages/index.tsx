import React from 'react';
import {Redirect} from '@docusaurus/router';

/**
 * 主页组件
 * 自动重定向到文档首页
 */
export default function Home() {
  return <Redirect to="/oadin-docs/docs/intro" />;
}

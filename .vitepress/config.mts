import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DronePilotWeb Docs",
  description: "基于 Vue 3 和 Three.js 的无人机模拟器和可视化编程环境",
  lang: 'zh-CN',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.ico',
    siteTitle: 'DronePilotWeb',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/introduction' },
      { text: '示例代码', link: '/examples/basic' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '项目介绍',
          items: [
            { text: '初次见面', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '学习基础概念', link: '/guide/concepts' }
          ]
        },
        {
          text: 'API 参考',
          items: [
            { text: '运动控制 API', link: '/guide/droneAPI' },
            { text: '摄像头 API', link: '/guide/cameraAPI' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '示例代码',
          items: [
            { text: '基础示例', link: '/examples/basic' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ocetars/DronePilotWeb' }
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025-present DronePilotWeb'
    }
  }
})

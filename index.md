---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "DronePilotWeb"
  text: "无人机网页编程模拟器"
  tagline: 开箱即用，让您的无人机高效起飞
  image:
    src: /logo_blue-removebg.png
    alt: DronePilotWeb
  actions:
    - theme: brand
      text: 查看文档
      link: /guide/getting-started
    - theme: alt
      text: 前往 DronePilotWeb
      link: https://dronepilot.ocetars.top

features:
  - title: 三维场景模拟
    details: 使用 Three.js 构建真实的 3D 场景，支持无人机模型加载、场景控制和视角调整
    icon: 🎮
  - title: 可视化编程
    details: 集成 Monaco Editor，支持 JavaScript 代码编写，实时控制无人机行为
    icon: 💻
  - title: 图像处理能力
    details: 集成 OpenCV.js，支持实时图像处理和目标检测，实现复杂的视觉控制逻辑
    icon: 📸
  - title: 场景管理
    details: 支持保存和加载自定义场景，包括地面纹理、尺寸和无人机位置
    icon: 💾
  - title: 用户认证
    details: 集成 Clerk 用户认证系统，确保数据安全
    icon: 🔐
  - title: 实时反馈
    details: 提供实时的无人机状态和摄像头画面反馈，支持代码调试
    icon: 📊
---


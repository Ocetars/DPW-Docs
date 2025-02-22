import Theme from 'vitepress/theme'
import './style/var.css'
import { inject } from '@vercel/analytics'

// 初始化 Vercel Analytics
if (typeof window !== 'undefined') {
  inject()
}

export default {
  ...Theme
}

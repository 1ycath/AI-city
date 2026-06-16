import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const DEFAULT_BASE_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1'

function buildDashscopeProxy(apiKey, baseUrl) {
  const apiBase = new URL(baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`)
  const chatPath = `${apiBase.pathname.replace(/\/$/, '')}/chat/completions`

  return {
    '/api/chat': {
      target: apiBase.origin,
      changeOrigin: true,
      secure: true,
      rewrite: () => chatPath,
      configure: (proxy) => {
        proxy.on('proxyReq', (proxyReq) => {
          if (apiKey) {
            proxyReq.setHeader('Authorization', `Bearer ${apiKey}`)
          }
        })
      },
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.DASHSCOPE_API_KEY
  const baseUrl = env.DASHSCOPE_BASE_URL || DEFAULT_BASE_URL

  if (!apiKey) {
    console.warn('[vite] 未找到 DASHSCOPE_API_KEY，请在 .env.local 中配置')
  }

  const dashscopeProxy = buildDashscopeProxy(apiKey, baseUrl)

  return {
    plugins: [react()],
    server: { proxy: dashscopeProxy },
    preview: { proxy: dashscopeProxy },
  }
})

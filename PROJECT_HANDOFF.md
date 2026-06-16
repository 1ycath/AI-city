# PROJECT_HANDOFF.md

> **AI城市医生** — 项目交接文档  
> 供后续 Agent 或开发者快速接手、扩展与排障。  
> 最后更新：2026-06-09

---

## 1. Project Overview

### 当前项目做什么

**AI城市医生** 是一个智慧城市运营管理前端面板（SPA），采用「城市医生」隐喻：像医生诊断人体一样，对城市进行分级监测、告警研判与 AI 辅助决策。

产品定位：

- **可视化总览**：按 **城市 → 街区 → 社区 → 住房** 四层级展示指标、趋势图、健康维度与治理项目
- **空间感知**：高德地图标注监测点位，支持飞至区域、点击进入建筑详情与 3D 模型
- **智能问诊**：接入阿里云 DashScope（通义千问 `qwen3.7-plus`），提供带上下文的多轮对话
- **告警与设置**：告警列表、系统设置等辅助页面

技术栈：**Vite 8 + React 19 + React Router 7**，深色科技风 UI，数据目前以 **Mock** 为主（无后端服务）。

### 已实现的核心功能

| 模块 | 路由 | 状态 | 说明 |
|------|------|------|------|
| 总览看板 | `/dashboard` | ✅ 完成 | 四层级 Tab 切换、实体选择器、4 指标卡、趋势图、健康条形图、治理项目、城市级分布图 |
| 城市地图 | `/map` | ✅ 完成 | 高德 JSAPI 2.0 深色 3D 地图；左上角标签飞至点位；Marker 点击进详情 |
| 建筑详情 | `/building/:id` | ✅ 完成 | 基本信息 + `@react-three/fiber` 加载 `public/3Dmodels/part*.glb` |
| 城市医生对话 | `/chat` | ✅ 完成 | DashScope 多轮对话；系统提示词「AI城市医生助手」；Vite 代理隐藏 API Key |
| 告警中心 | `/alerts` | ✅ 完成 | Mock 告警列表，含层级标注 |
| 系统设置 | `/settings` | ⚠️ 占位 | 静态 Mock 开关 UI，无持久化与真实逻辑 |
| 全局布局 | — | ✅ 完成 | 左侧 Sidebar、顶部 TopBar（面包屑 + 时钟）、主内容区 |

---

## 2. Current State

### 代码 / 系统当前运行状态

```bash
# 安装依赖
npm install

# 配置环境变量（复制 .env.example → .env.local 并填写）
# 开发（含 DashScope 代理）
npm run dev

# 生产构建（已通过验证）
npm run build
npm run preview   # preview 同样带 DashScope 代理
```

**运行前提：**

| 服务 | 环境变量 | 说明 |
|------|----------|------|
| 高德地图 | `VITE_AMAP_KEY`、`VITE_AMAP_SECURITY_CODE` | 写入 `.env.local`；`src/config/amap.js` 设置 `_AMapSecurityConfig` |
| AI 对话 | `DASHSCOPE_API_KEY`、`DASHSCOPE_BASE_URL` | Key **不**使用 `VITE_` 前缀；经 `vite.config.js` 代理 `/api/chat` → DashScope |

**已知限制：**

- 所有业务数据来自 `src/data/mock.js`，刷新页面后对话上下文丢失（仅内存 state）
- DashScope 代理仅在 `npm run dev` / `npm run preview` 有效；**纯静态 CDN 部署需自建后端转发**
- 图表均为 CSS 手绘 Mock 图，非 ECharts / Chart.js
- `package.json` 的 `name` 仍为 `ai-city-dashboard`，与产品名「AI城市医生」不一致（仅内部标识）

### 已完成模块

```
✅ 项目脚手架与路由
✅ 全局布局（Sidebar / TopBar / AppLayout）
✅ 四层级 Dashboard（城市/街区/社区/住房）
✅ 高德地图集成（AmapView、zone 标签、marker 导航）
✅ 建筑详情页 + GLB 3D Viewer（Bounds 自适应）
✅ AI 对话页（DashScope qwen3.7-plus、上下文、清空对话）
✅ Mock 数据体系（层级、地图 zone、告警、3D 模型映射）
✅ 环境变量与 Vite 代理配置
✅ 生产构建（npm run build 成功）
```

### 未完成 / 待扩展模块

```
⬜ 真实后端 API（替换 mock.js）
⬜ 用户认证与权限
⬜ 设置页功能落地（localStorage / 后端同步）
⬜ 告警与 Dashboard / 地图 / 对话的数据联动（如点击告警跳转对应层级）
⬜ 对话流式输出（当前为一次性返回全文）
⬜ 对话与实时城市指标 RAG 注入（将 mock/真实数据作为 context）
⬜ 生产环境 DashScope 后端代理（避免 dev-only 代理）
⬜ 单元测试 / E2E 测试
⬜ 国际化
⬜ Settings、Alerts 的增删改查
⬜ 地图与层级 Dashboard 双向联动（从地图 zone 直接切到对应街区/社区看板）
⬜ package.json 项目名与 README 完全统一 branding
```

---

## 3. Key Architecture / Design

### 3.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│  Browser (React SPA)                                        │
│  ┌──────────┐  ┌──────────────────────────────────────────┐ │
│  │ Sidebar  │  │ TopBar                                    │ │
│  │ 导航     │  │ 面包屑 / 时钟                             │ │
│  └──────────┘  ├──────────────────────────────────────────┤ │
│                │ <Outlet /> 页面内容                        │ │
│                │  Dashboard | Map | Chat | Building | ...  │ │
│                └──────────────────────────────────────────┘ │
└───────────────┬─────────────────────┬───────────────────────┘
                │                     │
        mock.js（本地）          Vite Dev Proxy
                │                     │
                │              /api/chat → DashScope
                │                     │
        public/3Dmodels/*.glb   高德 Web API（浏览器直连）
```

**设计原则：**

- **pages** 负责页面编排与状态；**components** 按领域分子目录；**data** 集中 Mock；**services** 封装外部 API
- 路由统一挂在 `AppLayout` 下，保留全局导航；`/building/:id` 为详情子页，不在 Sidebar 中单独列出
- 样式：CSS 变量（`src/styles/variables.css`）+ 组件级 CSS，无 Tailwind / CSS-in-JS

### 3.2 路由结构

| 路径 | 组件 | 备注 |
|------|------|------|
| `/` | → `/dashboard` | 默认重定向 |
| `/dashboard` | `pages/Dashboard.jsx` | 四层级看板 |
| `/map` | `pages/Map.jsx` | 高德地图 |
| `/chat` | `pages/Chat.jsx` | AI 对话 |
| `/building/:id` | `pages/BuildingDetail.jsx` | zone id，如 `A-12` |
| `/alerts` | `pages/Alerts.jsx` | 告警列表 |
| `/settings` | `pages/Settings.jsx` | 设置占位 |

路由定义：`src/router.jsx`  
入口：`src/main.jsx` → `src/App.jsx`（`RouterProvider`）

### 3.3 数据流

#### Dashboard 层级数据流

```
HIERARCHY_LEVELS (city|block|community|housing)
        │
        ▼
getEntitiesForLevel(level)  →  EntityPicker 选项
        │
        ▼
getDashboardData(level, entityId)  →  stats / charts / projects
        │
        ▼
StatCard | MockChart | HealthBarChart | ProjectList | CompositionChart
```

数据来源：`src/data/mock.js` → `hierarchyDashboard` 对象树。

#### 地图 → 建筑详情

```
mapZones[].id  ──marker click──►  navigate(`/building/${zoneId}`)
mapZones[].building.modelUrl  ──►  ModelViewer 加载 GLB

ZONE_MODELS 映射：
  A-12 → part1.glb | B-07 → part2.glb | C-03 → part3.glb
  D-01 → part4.glb | E-09 → part5.glb
```

地图交互（`AmapView.jsx`）：

- **左上角区域标签** → `setZoomAndCenter` 飞至点位（不跳转）
- **地图 Marker 点击** → 跳转 `/building/:id`

#### AI 对话数据流

```
用户输入
  → Chat.jsx 维护 messages[]（含 CHAT_WELCOME）
  → buildApiMessages(): [system prompt, ...history]
  → dashscopeChat.sendChatCompletion()
  → fetch('/api/chat')  // 同源，走 Vite 代理
  → DashScope compatible-mode/v1/chat/completions
  → 解析 choices[0].message.content → 追加到 messages
```

配置：

- 模型：`src/constants/chatPrompt.js` → `CHAT_MODEL = 'qwen3.7-plus'`
- Base URL：`DASHSCOPE_BASE_URL`（默认 `https://dashscope.aliyuncs.com/compatible-mode/v1`）
- 系统提示词：同文件 `CHAT_SYSTEM_PROMPT`（AI城市医生助手角色）

### 3.4 目录结构（重要文件）

```
AI city/
├── .env.local              # 本地密钥（git 忽略，勿提交）
├── .env.example            # 环境变量模板
├── vite.config.js          # DashScope 代理、loadEnv
├── index.html              # 标题：AI城市医生
├── public/
│   ├── 3Dmodels/           # part1.glb … part5.glb（建筑 3D 模型）
│   ├── models/             # 早期示例 GLB（已不再用于 zone 映射）
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── router.jsx                    # 路由表
    ├── config/
    │   └── amap.js                   # 高德 Key + securityJsCode
    ├── constants/
    │   └── chatPrompt.js             # 模型名、Base URL 常量、系统提示词
    ├── data/
    │   └── mock.js                   # ★ 核心 Mock：层级、地图、告警、导航
    ├── services/
    │   └── dashscopeChat.js          # DashScope 请求封装
    ├── styles/
    │   ├── variables.css             # 设计 token
    │   └── globals.css
    ├── components/
    │   ├── layout/                   # AppLayout, Sidebar, TopBar
    │   ├── dashboard/                # StatCard, MockChart, HierarchyTabs, …
    │   ├── map/                      # AmapView
    │   ├── viewer/                   # ModelViewer (R3F + GLB)
    │   ├── chat/                     # ChatMessage, ChatInput
    │   └── icons/                    # NavIcon（SVG 图标映射）
    └── pages/
        ├── Dashboard.jsx             # 四层级看板主页面
        ├── Map.jsx
        ├── Chat.jsx
        ├── BuildingDetail.jsx
        ├── Alerts.jsx
        └── Settings.jsx
```

### 3.5 关键设计决策

| 决策 | 原因 |
|------|------|
| Mock 数据集中在 `mock.js` | 便于后续一次性替换为 API 层 |
| 高德安全密钥在 `amap.js` 模块顶层设置 | 符合 JSAPI 2.0 要求，须在 `AMapLoader.load` 前执行 |
| DashScope 走 Vite 代理 | 避免 `VITE_` 前缀导致 API Key 打进前端 bundle |
| 3D 模型放 `public/3Dmodels/` | GLB 体积大，静态资源直出；`useGLTF` 用 URL 加载 |
| Dashboard 层级与地图 zone 部分关联 | `mapZones[].hierarchy` 含 `blockId`/`communityId`，尚未在 UI 双向联动 |
| 图表用纯 CSS 柱状图 | 零图表库依赖；后续可换 ECharts 但需改组件接口 |

### 3.6 外部依赖与 Skill 参考

| 依赖 | 用途 |
|------|------|
| `react-router-dom` | 路由 |
| `@amap/amap-jsapi-loader` | 高德地图加载 |
| `@react-three/fiber` + `@react-three/drei` + `three` | GLB 预览 |
| DashScope HTTP API | 大模型对话（OpenAI 兼容格式） |

高德开发可参阅用户本地 Skill：`~/.cursor/skills/amap-jsapi-skill/SKILL.md`（含 `setZoomAndCenter`、Marker 事件等）。

### 3.7 接手后常见任务指引

| 任务 | 建议入口 |
|------|----------|
| 新增 Sidebar 页面 | `mock.js` navItems → `router.jsx` → `pages/` |
| 扩充层级 Mock | `mock.js` → `hierarchyDashboard` |
| 替换真实 API | 新建 `src/services/api.js`，逐步替换 `mock.js` 引用 |
| 换对话模型 | `src/constants/chatPrompt.js` → `CHAT_MODEL` |
| 新增地图点位 | `mapZones` + `ZONE_MODELS` + 可选 `public/3Dmodels/` |
| 生产部署对话 | 实现 `/api/chat` 后端转发，或改 `dashscopeChat.js` 的 fetch URL |

---

## Quick Reference

```bash
npm run dev      # http://localhost:5173（端口占用时会递增）
npm run build    # 输出 dist/
npm run lint     # ESLint
```

**品牌常量：** `APP_NAME = 'AI城市医生'`（`src/data/mock.js`）

**默认首页：** `/dashboard`

---

*本文档随功能迭代请同步更新「Current State」与「未完成模块」两节。*

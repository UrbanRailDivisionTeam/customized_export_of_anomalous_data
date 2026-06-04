# 异常处理数据看板 — 前后端接口文档

## 概述

| 项 | 说明 |
|---|---|
| 后端框架 | Litestar |
| 基础 URL | `http://localhost:8800` |
| 数据格式 | JSON（UTF-8） |
| 跨域 | CORS 全放通 `allow_origins=["*"]` |
| 认证 | 无（内网部署） |

---

## API 端点

### 1. 获取原始异常记录

```
GET /api/records
```

**响应** `AnomalyRecord[]`

```json
[
  {
    "zid": "EX-000001",
    "异常类型": "缺料异常",
    "异常描述": "缺料异常—CR450动车组项目左侧安装工序",
    "项目": "PRJ001",
    "项目名称": "CR450动车组项目",
    "节车号": "TC3",
    "车号": "CR450-2500",
    "工作中心": "总成车间",
    "工位": "总-05",
    "工序名称": "缺料异常处理",
    "工序编码": "OP-123",
    "异常状态分类": "已关闭",
    "创建日期": "2026-05-15 10:30:00",
    "修改日期": "2026-05-16 08:00:00",
    "发起人": "USR0100",
    "发起日期": "2026-05-15 10:00:00",
    "发起人姓名": "赵工",
    "发起人组室": "落车班",
    "发起人部门": "调试交付",
    "指定响应人": "EMP0100",
    "指定响应人姓名": "张伟",
    "指定响应人组室": "落车班",
    "指定响应人部门": "调试交付",
    "响应人": "张伟",
    "响应日期": "2026-05-15 11:30:00",
    "响应人姓名": "张伟",
    "响应人组室": "落车班",
    "响应人部门": "调试交付",
    "处理人": "李强",
    "处理日期": "2026-05-16 08:00:00",
    "处理人姓名": "李强",
    "处理人组室": "调车班",
    "处理人部门": "调试交付",
    "关闭人": "王芳",
    "关闭日期": "2026-05-16 12:00:00",
    "关闭人姓名": "王芳",
    "关闭人组室": "校线一班",
    "关闭人部门": "调试交付",
    "department": "调试交付",
    "响应是否超时": "否",
    "处理是否超时": "是"
  }
]
```

**字段说明**

| 字段 | 类型 | 说明 |
|---|---|---|
| zid | string | 异常记录唯一 ID |
| 异常类型 | string | 缺料异常 / 设备故障 / 工艺问题 / 质量异常 / 人员问题 / 图纸问题 |
| 异常状态分类 | string | 已关闭 / 处理中 / 待响应 |
| 工作中心 | string | 总成车间 / 交车车间 / 调试车间 |
| department | string | 总成组装 / 调试交付 / 项目管理 / 工艺技术 / 质量管理 |
| 响应是否超时 | "是" \| "否" | 超过 2 小时即为超时 |
| 处理是否超时 | "是" \| "否" | 超过 24 小时即为超时 |

---

### 2. 部门统计

```
GET /api/stats/department
```

按**工作中心**维度聚合的统计数据。

**响应** `DepartmentStats[]`

| 字段 | 类型 | 说明 |
|---|---|---|
| 工作中心 | string | |
| 总数 | number | |
| 响应数 | number | |
| 响应及时数_总时长2H | number | |
| 响应率 | number | 0–1 的小数 |
| 响应及时率_总时长2H | number | 0–1 |
| 处理数 | number | |
| 处理及时数_总时长24H | number | |
| 处理率 | number | 0–1 |
| 处理及时率_总时长24H | number | 0–1 |
| 关闭数 | number | |
| 关闭率 | number | 0–1 |

---

### 3. 个人统计

```
GET /api/stats/personal
```

按**指定响应人**聚合的个人指标，按总数降序排列。

**响应** `PersonalStats[]`

| 字段 | 类型 | 说明 |
|---|---|---|
| 工号 | string | 指定响应人工号 |
| 姓名 | string | |
| 组室 | string | |
| 部门 | string | |
| 总数 | number | |
| … (同 DepartmentStats 的率字段) | | |

---

### 4. 部门组室统计

```
GET /api/stats/group?department={department}
```

**参数**

| 参数 | 必填 | 可选值 |
|---|---|---|
| department | 是 | `总成组装` / `调试交付` / `项目管理` / `工艺技术` |

**响应** `GroupStats[]`

| 字段 | 类型 | 说明 |
|---|---|---|
| 组室 | string | |
| … (同 DepartmentStats 的指标字段) | | |

---

## 前端对接

### 环境变量

前端 `web/.env`:

```
NEXT_PUBLIC_API_BASE=http://localhost:8800
```

### API 客户端

```ts
// web/lib/api.ts
import { fetchRecords, fetchDepartmentStats, fetchPersonalStats, fetchGroupStats } from "@/lib/api"

// 原始数据
const records = await fetchRecords()

// 部门统计
const deptStats = await fetchDepartmentStats()

// 个人统计
const personalStats = await fetchPersonalStats()

// 部门组室统计
const groupStats = await fetchGroupStats("总成组装")
```

### 前端组件映射

| Tab | API 端点 | 组件 |
|---|---|---|
| 月报视图 | `GET /api/records` | `RawDataTable` |
| 部门概览 | `GET /api/stats/department` | `DepartmentOverview` |
| 个人统计 | `GET /api/stats/personal` | `PersonalStats` |
| 总成车间 | `GET /api/stats/group?department=总成组装` | `GroupStats` |
| 交车车间 | `GET /api/stats/group?department=调试交付` | `GroupStats` |
| 项目管理 | `GET /api/stats/group?department=项目管理` | `GroupStats` |
| 工艺质量 | `GET /api/stats/group?department=工艺技术` | `GroupStats` |
| 原始数据 | `GET /api/records` | `RawDataTable` |

---

## 启动方式

### 后端

```bash
cd server
uv sync                          # 安装依赖
uv run uvicorn main:app --port 8800
```

### 前端

```bash
cd web
pnpm dev                         # 开发模式（默认 http://localhost:3000）
pnpm build                       # 静态导出到 web/out/
```

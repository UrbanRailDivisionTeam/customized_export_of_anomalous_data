// ============================================================
// 前端 API 客户端 — 与后端 Litestar 服务对接
// ============================================================

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8800"

export interface ApiError {
  message: string
  status: number
}

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    throw { message: `API error ${res.status}: ${res.statusText}`, status: res.status } as ApiError
  }
  return res.json()
}

// ============================================================
// 后端 API 类型（与 mock-data.ts 一致，此处重新声明以解耦）
// ============================================================

export interface AnomalyRecord {
  zid: string
  异常类型: string
  异常描述: string
  项目: string
  项目名称: string
  节车号: string
  车号: string
  工作中心: string
  工位: string
  工序名称: string
  工序编码: string
  异常状态分类: string
  创建日期: string
  修改日期: string
  发起人: string
  发起日期: string
  发起人姓名: string
  发起人组室: string
  发起人部门: string
  指定响应人: string
  指定响应人姓名: string
  指定响应人组室: string
  指定响应人部门: string
  响应人: string
  响应日期: string
  响应人姓名: string
  响应人组室: string
  响应人部门: string
  处理人: string
  处理日期: string
  处理人姓名: string
  处理人组室: string
  处理人部门: string
  关闭人: string
  关闭日期: string
  关闭人姓名: string
  关闭人组室: string
  关闭人部门: string
  department: string
  响应是否超时: "是" | "否"
  处理是否超时: "是" | "否"
}

export interface DepartmentStats {
  工作中心: string
  总数: number
  响应数: number
  响应及时数_总时长2H: number
  响应及时数_有效时长2H: number
  处理数: number
  处理及时数_总时长24H: number
  处理及时数_有效时长8H: number
  关闭数: number
  响应率: number
  响应及时率_总时长2H: number
  响应及时率_有效时长2H: number
  处理率: number
  处理及时率_总时长24H: number
  处理及时率_有效时长8H: number
  关闭率: number
}

export interface PersonalStats {
  工号: string
  姓名: string
  组室: string
  部门: string
  总数: number
  响应数: number
  响应及时数_总时长2H: number
  响应及时数_有效时长2H: number
  处理数: number
  处理及时数_总时长24H: number
  处理及时数_有效时长8H: number
  关闭数: number
  响应率: number
  响应及时率_总时长2H: number
  响应及时率_有效时长2H: number
  处理率: number
  处理及时率_总时长24H: number
  处理及时率_有效时长8H: number
  关闭率: number
}

export interface GroupStats {
  组室: string
  总数: number
  响应数: number
  响应及时数_总时长2H: number
  响应及时数_有效时长2H: number
  处理数: number
  处理及时数_总时长24H: number
  处理及时数_有效时长8H: number
  关闭数: number
  响应率: number
  响应及时率_总时长2H: number
  响应及时率_有效时长2H: number
  处理率: number
  处理及时率_总时长24H: number
  处理及时率_有效时长8H: number
  关闭率: number
}

// ============================================================
// API 方法
// ============================================================

export function fetchRecords(): Promise<AnomalyRecord[]> {
  return fetchApi<AnomalyRecord[]>("/api/records")
}

export function fetchDepartmentStats(): Promise<DepartmentStats[]> {
  return fetchApi<DepartmentStats[]>("/api/stats/department")
}

export function fetchPersonalStats(): Promise<PersonalStats[]> {
  return fetchApi<PersonalStats[]>("/api/stats/personal")
}

export function fetchGroupStats(department: string): Promise<GroupStats[]> {
  return fetchApi<GroupStats[]>(`/api/stats/group?department=${encodeURIComponent(department)}`)
}

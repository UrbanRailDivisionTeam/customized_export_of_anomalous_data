"""异常处理数据看板 — 后端 API 服务 (Litestar)"""

from litestar import Litestar, get
from litestar.config.cors import CORSConfig
from litestar.params import Parameter

from mock_data import (
    get_records,
    compute_department_stats,
    compute_personal_stats,
    compute_group_stats,
)

RECORDS = get_records(120)

# ============================================================
# API 端点
# ============================================================


@get("/api/records")
async def api_records() -> list[dict]:
    """返回全部异常记录（原始数据）"""
    return RECORDS


@get("/api/stats/department")
async def api_department_stats() -> list[dict]:
    """按工作中心汇总的部门统计"""
    return compute_department_stats(RECORDS)


@get("/api/stats/personal")
async def api_personal_stats() -> list[dict]:
    """按人员汇总的个人统计"""
    return compute_personal_stats(RECORDS)


@get("/api/stats/group")
async def api_group_stats(
    department: str = Parameter(
        query="department",
        description="部门名称: 总成组装 / 调试交付 / 项目管理 / 工艺技术",
        required=True,
    ),
) -> list[dict]:
    """按部门筛选的组室统计"""
    return compute_group_stats(RECORDS, department)


# ============================================================
# 启动
# ============================================================

cors_config = CORSConfig(allow_origins=["*"], allow_methods=["GET"])

app = Litestar(
    route_handlers=[api_records, api_department_stats, api_personal_stats, api_group_stats],
    cors_config=cors_config,
)

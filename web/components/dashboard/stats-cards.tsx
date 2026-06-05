import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { DepartmentStats } from "@/lib/api"

function fmt(v: number) {
    return `${(v * 100).toFixed(1)}%`
}

interface StatsCardsProps {
    stats: DepartmentStats[]
    className?: string
}

export function StatsCards({ stats, className }: StatsCardsProps) {
    const total = stats.reduce((s, r) => s + r.总数, 0)
    const responded = stats.reduce((s, r) => s + r.响应数, 0)
    const respondedTimely = stats.reduce((s, r) => s + r.响应及时数_总时长2H, 0)
    const processed = stats.reduce((s, r) => s + r.处理数, 0)
    const processedTimely = stats.reduce((s, r) => s + r.处理及时数_总时长24H, 0)
    const closed = stats.reduce((s, r) => s + r.关闭数, 0)

    const cards = [
        { label: "异常总数", value: total },
        { label: "响应数", value: responded, sub: `响应率 ${fmt(total > 0 ? responded / total : 0)}` },
        { label: "响应及时数", value: respondedTimely, sub: `及时率 ${fmt(total > 0 ? respondedTimely / total : 0)}` },
        { label: "处理数", value: processed, sub: `处理率 ${fmt(total > 0 ? processed / total : 0)}` },
        { label: "处理及时数", value: processedTimely, sub: `及时率 ${fmt(total > 0 ? processedTimely / total : 0)}` },
        { label: "关闭数", value: closed, sub: `关闭率 ${fmt(total > 0 ? closed / total : 0)}` },
    ]

    return (
        <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6", className)}>
            {cards.map((c) => (
                <Card key={c.label} size="sm">
                    <CardHeader className="pb-1">
                        <CardTitle className="text-xs font-normal text-muted-foreground">{c.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold tabular-nums">{c.value}</div>
                        {c.sub && <div className="mt-0.5 text-xs text-muted-foreground">{c.sub}</div>}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

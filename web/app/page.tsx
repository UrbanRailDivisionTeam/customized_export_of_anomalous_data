import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { DepartmentOverview } from "@/components/dashboard/department-overview"
import { PersonalStats } from "@/components/dashboard/personal-stats"
import { GroupStats } from "@/components/dashboard/group-stats"
import { RawDataTable } from "@/components/dashboard/raw-data-table"
import { ThemeToggle } from "@/components/theme-toggle"

const tabs = [
  { id: "monthly", label: "月报视图", component: RawDataTable },
  { id: "source", label: "部门概览", component: DepartmentOverview },
  { id: "personal", label: "个人统计", component: PersonalStats },
  { id: "assembly", label: "总成车间", component: () => <GroupStats department="总成组装" /> },
  { id: "delivery", label: "交车车间", component: () => <GroupStats department="调试交付" /> },
  { id: "project", label: "项目管理", component: () => <GroupStats department="项目管理" /> },
  { id: "process", label: "工艺质量", component: () => <GroupStats department="工艺技术" /> },
  { id: "raw", label: "原始数据", component: RawDataTable },
]

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col p-4 sm:p-6 lg:p-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">异常处理数据看板</h1>
        <ThemeToggle />
      </header>

      <Separator className="mb-6" />

      <Tabs defaultValue="monthly" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="mb-6 h-auto p-2 gap-1">
            {tabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id} className="text-sm px-3 py-1.5 h-auto">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((t) => (
          <TabsContent key={t.id} value={t.id}>
            <t.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

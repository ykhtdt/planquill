"use client"

import { cn } from "@workspace/ui/lib/utils"
import {
  SidebarTrigger,
  useSidebar,
} from "@workspace/ui/components/sidebar"

import { TaskTable } from "@/components/task-table/task-table"

export default function Page() {
  const { state } = useSidebar()

  const isCollapsed = state === "collapsed"

  return (
    <div className={cn("min-h-svh p-2 space-y-2", isCollapsed ? "border-r" : "border-x")}>
      <div className="flex items-center justify-between">
        <SidebarTrigger />
      </div>
      <TaskTable />
    </div>
  )
}

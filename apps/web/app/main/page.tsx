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
    <div className={cn("grid items-start p-2 gap-2 min-h-[calc(100svh-var(--header-height)-var(--footer-height))] grid-rows-[auto_1fr]", isCollapsed ? "border-r" : "border-x")}>
      <div className="flex items-center justify-between">
        <SidebarTrigger />
      </div>
      <TaskTable />
    </div>
  )
}

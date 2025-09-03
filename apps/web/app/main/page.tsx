"use client"

import {
  SidebarTrigger,
  useSidebar,
} from "@workspace/ui/components/sidebar"

export default function Page() {
  const { state } = useSidebar()

  const isCollapsed = state === "collapsed"

  return (
    <div className={isCollapsed ? "border-r" : "border-x"}>
      <SidebarTrigger />
      <div className="h-[5000px]">
        {/* Main */}
      </div>
    </div>
  )
}

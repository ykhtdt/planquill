import {
  Sidebar,
  SidebarContent,
} from "@workspace/ui/components/sidebar"

export default function SidebarSlot() {
  return (
    <Sidebar className="relative h-[calc(100svh-var(--header-height)-var(--footer-height))] group-data-[collapsible=offcanvas]:w-0">
      <SidebarContent className="no-scrollbar bg-background">
        {/* Sidebar */}
      </SidebarContent>
    </Sidebar>
  )
}

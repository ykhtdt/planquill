import {
  Sidebar,
  SidebarContent,
} from "@workspace/ui/components/sidebar"

export default function SidebarSlot() {
  return (
    <Sidebar className="sticky top-[var(--header-height)] h-[calc(100svh-var(--header-height)-var(--footer-height))] border-none group-data-[collapsible=offcanvas]:w-0">
      <SidebarContent className="no-scrollbar bg-background">
        {/* Sidebar */}
      </SidebarContent>
    </Sidebar>
  )
}

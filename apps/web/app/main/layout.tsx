import Link from "next/link"

import { SidebarProvider } from "@workspace/ui/components/sidebar"

import { PlanquillIcon } from "@/components/icons/planquill-icon"

export default function Layout({
  children,
  sidebar,
  schedule,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
  schedule: React.ReactNode
}) {
  return (
    <div
      className="relative flex h-svh flex-col overflow-y-auto md:rounded-md"
      style={
        {
          "--header-height": "calc(var(--spacing)*14)",
          "--footer-height": "calc(var(--spacing)*20)",
        } as React.CSSProperties
      }
    >
      <header className="sticky top-0 z-50 w-full bg-background">
        <div className="w-full max-w-9xl mx-auto">
          <div className="w-full h-(--header-height) px-4 sm:px-2 flex items-center justify-between gap-2 border-b">
            <div className="flex items-center gap-2">
              <Link href="/">
                <PlanquillIcon className="size-7 pointer-events-none" />
                <span className="sr-only">Planquill</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {/* Header */}
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-col flex-1 bg-background">
        <div className="flex flex-col flex-1 w-full max-w-9xl mx-auto">
          <SidebarProvider className="min-h-full bg-background">
            {sidebar}
            <div className="bg-background w-full h-full flex-1">
              <div className="flex items-stretch text-sm sm:text-base w-full">
                <div className="flex flex-col flex-1">
                  <div id="content">
                    {/* Todo */}
                    {children}
                  </div>
                </div>
                <div className="sticky top-[calc(var(--header-height))] z-30 ml-auto hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
                  {schedule}
                </div>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </main>
      <footer className="bg-background">
        <div className="w-full max-w-9xl mx-auto">
          <div className="h-(--footer-height) flex items-center justify-center gap-2 px-2 border-t">
            {/* Footer */}
          </div>
        </div>
      </footer>
    </div>
  )
}

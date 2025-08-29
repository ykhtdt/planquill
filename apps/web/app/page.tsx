import Link from "next/link"

import { Button } from "@workspace/ui/components/button"

import {
  auth,
  signOut,
} from "@/auth"
import { PlanquillIcon } from "@/components/icons/planquill-icon"

export default async function Page() {
  const session = await auth()

  return (
    <div
      className="relative flex h-svh flex-col overflow-y-auto md:rounded-md"
      style={
        {
          "--header-height": "calc(var(--spacing)*14)",
          "--footer-height": "calc(var(--spacing)*20)",
          "--top-spacing": "calc(var(--spacing)*4)",
        } as React.CSSProperties
      }
    >
      <header className="sticky top-0 z-50 w-full bg-background">
        <div className="w-full max-w-9xl mx-auto px-4 sm:px-2">
          <div className="h-(--header-height) flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Link href="/">
                <PlanquillIcon className="size-7 pointer-events-none" />
                <span className="sr-only">Planquill</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {session?.user ? (
                <Button asChild size="sm" className="text-sm">
                  <a href="#">Get Started</a>
                </Button>
              ) : (
                <Button asChild variant="ghost" size="sm" className="text-sm">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              )}
              {session?.user && (
                <form
                  action={async () => {
                    "use server"
                    await signOut()
                  }}
                >
                  <>
                    <Button type="submit" variant="ghost" size="sm" className="text-sm">
                      Sign Out
                    </Button>
                  </>
                </form>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-col flex-1 bg-background">
        <div className="h-[var(--top-spacing)] shrink-0" />
        <div className="flex flex-col flex-1 w-full max-w-9xl mx-auto px-4 sm:px-2 md:px-0">
          {/* Home */}
        </div>
      </main>
      <footer className="bg-background">
        <div className="w-full max-w-9xl mx-auto px-2">
          <div className="h-(--footer-height) flex items-center justify-center gap-2 px-2">
            {/* Footer */}
          </div>
        </div>
      </footer>
    </div>
  )
}

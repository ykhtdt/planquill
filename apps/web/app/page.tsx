import Link from "next/link"

import { Button } from "@workspace/ui/components/button"

import {
  auth,
  signOut,
} from "@/auth"

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
              <Link href="/" className="[&_svg]:size-7 [&_svg]:pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="32" cy="32" r="20.736" strokeDasharray="116.64 51.84" />
                  <circle cx="32" cy="32" r="12.96" strokeDasharray="64.8 51.84" />
                  <path d="M16.448 34.592 L25.52 43.664 L46.256 17.744" />
                </svg>
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

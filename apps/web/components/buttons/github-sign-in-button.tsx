"use client"

import { signIn } from "next-auth/react"

import { cn } from "@workspace/ui/lib/utils"
import { GithubIcon } from "@/components/icons/github-icon"
import { Button } from "@workspace/ui/components/button"

type GithubSignInButtonProps = React.ComponentProps<typeof Button>

export const GithubSignInButton = ({
  variant = "outline",
  className,
  children,
  ...props
}: GithubSignInButtonProps) => {
  const handleGithubSignIn = () => {
    signIn("github")
  }

  return (
    <Button variant={variant} onClick={handleGithubSignIn} className={cn("flex items-center gap-2", className)} {...props}>
      {children ?? (
        <>
          <GithubIcon />
          <span>Github</span>
        </>
      )}
    </Button>
  )
}

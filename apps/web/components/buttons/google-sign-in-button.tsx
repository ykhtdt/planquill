"use client"

import { signIn } from "next-auth/react"

import { cn } from "@workspace/ui/lib/utils"
import { GoogleIcon } from "@/components/icons/google-icon"
import { Button } from "@workspace/ui/components/button"

type GoogleSignInButtonProps = React.ComponentProps<typeof Button>

export const GoogleSignInButton = ({
  variant = "outline",
  className,
  children,
  ...props
}: GoogleSignInButtonProps) => {
  const handleGoogleSignIn = () => {
    signIn("google")
  }

  return (
    <Button variant={variant} onClick={handleGoogleSignIn} className={cn("flex items-center gap-2", className)} {...props}>
      {children ?? (
        <>
          <GoogleIcon />
          <span>Google</span>
        </>
      )}
    </Button>
  )
}

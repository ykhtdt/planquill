"use client"

import { signOut } from "next-auth/react"

import { LogOutIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"

type SignOutButtonProps = React.ComponentProps<typeof Button>

export const SignOutButton = ({
  variant = "outline",
  className,
  children,
  ...props
}: SignOutButtonProps) => {
  const handleSignOut = () => {
    signOut()
  }

  return (
    <Button variant={variant} onClick={handleSignOut} className={cn(className)} {...props}>
      {children ?? (
        <>
          <LogOutIcon />
          <span>Sign Out</span>
        </>
      )}
    </Button>
  )
}

import type { SVGProps } from "react"

import { cn } from "@workspace/ui/lib/utils"

type PlanquillIcon = SVGProps<SVGSVGElement>

export const PlanquillIcon = ({
  className,
  ...props
}: PlanquillIcon) => {
  return (
    <svg
      role="img"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-4 h-4", className)}
      {...props}
    >
      <title>Planquill</title>
      <circle cx="32" cy="32" r="20.736" strokeDasharray="116.64 51.84" />
      <circle cx="32" cy="32" r="12.96" strokeDasharray="64.8 51.84" />
      <path d="M16.448 34.592 L25.52 43.664 L46.256 17.744" />
    </svg>
  )
}

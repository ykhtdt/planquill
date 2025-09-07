"use client"

import * as React from "react"

import { PlusIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"

interface TaskTableCreateRowTriggerProps extends React.ComponentProps<"div"> {
  rowId: string
  onCreate: (rowId: string) => void
}

export const TaskTableCreateRowTrigger = ({
  rowId,
  onCreate,
  className,
  ...rest
}: TaskTableCreateRowTriggerProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onCreate(rowId)
    }
  }

  const handleInsert = () => {
    onCreate(rowId)
  }

  return (
    <div className={cn("group/insert-trigger relative h-px", className)} {...rest}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          size="icon"
          onClick={handleInsert}
          onKeyDown={handleKeyDown}
          className="w-6 h-6 rounded-full items-center justify-center text-sm font-bold z-10 opacity-0 group-hover/insert-trigger:opacity-100 focus-visible:opacity-100"
        >
          <PlusIcon className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}

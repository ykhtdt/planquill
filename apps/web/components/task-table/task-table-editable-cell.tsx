import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

interface EditableCellProps {
  value: string
  isEditing: boolean
  showValue?: boolean
  onClick: () => void
  onSave: (value: string) => void
  className?: string
}

export const TaskTableEditableCell = ({
  value,
  isEditing,
  showValue = true,
  onSave,
  onClick,
  className,
}: EditableCellProps) => {
  if (isEditing) {
    return (
      <TaskTableEditableCellInput value={value} onSave={onSave} />
    )
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn("w-full h-full bg-muted/50 hover:bg-muted rounded-sm px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 justify-start min-w-0", className)}
    >
      <span className="truncate text-left">
        {showValue ? value : ""}
      </span>
    </Button>
  )
}

interface TaskTableEditableCellInputProps {
  value: string
  onSave: (value: string) => void
  onCancel?: () => void
}

const TaskTableEditableCellInput = ({
  value,
  onSave,
}: TaskTableEditableCellInputProps) => {
  const [editValue, setEditValue] = React.useState(value)
  const originalValue = React.useRef(value)

  const handleSave = React.useCallback(() => {
    originalValue.current = editValue
    onSave(editValue)
  }, [editValue, onSave])

  const handleCancel = React.useCallback(() => {
    onSave(originalValue.current)
  }, [onSave])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }, [handleSave, handleCancel])

  const handleBlur = React.useCallback(() => {
    handleSave()
  }, [handleSave])

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value)
  }, [])

  return (
    <Input
      value={editValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      autoFocus
    />
  )
}

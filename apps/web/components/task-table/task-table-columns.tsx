"use client"

import * as React from "react"

import {
  EllipsisIcon,
} from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"

import {
  type Cell,
  type TaskItem,
} from "@/types/task"

import { TaskTableEditableCell } from "./task-table-editable-cell"

interface GetTaskTableColumnsProps {
  onDelete: (id: string) => void,
  editingCell: Cell | null,
  onCellEdit: (rowId: string, columnId: string) => void,
  onCellSave: (rowId: string, columnId: string, value: string) => void,
  onStatusToggle: (rowId: string, completed: boolean) => void
}

export const getTaskTableColumns = ({
  onDelete,
  editingCell,
  onCellEdit,
  onCellSave,
  onStatusToggle,
}: GetTaskTableColumnsProps): ColumnDef<TaskItem>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const isEditing = editingCell?.rowId === row.original.id && editingCell?.columnId === "title"

        return (
          <TaskTableEditableCell
            value={row.original.title}
            onClick={() => onCellEdit(row.original.id, "title")}
            onSave={(value) => onCellSave(row.original.id, "title", value)}
            isEditing={isEditing}
          />
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Checkbox
          checked={row.original.completed}
          onCheckedChange={(checked) =>
            onStatusToggle(row.original.id, checked === true)
          }
          className="cursor-pointer"
        />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="icon" onClick={() => onDelete(row.original.id)}>
          <EllipsisIcon />
        </Button>
      ),
    },
  ]
}

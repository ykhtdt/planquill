import * as React from "react"

import {
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  type Cell,
  type TaskItem,
} from "@/types/task"

import { getTaskTableColumns } from "@/components/task-table/task-table-columns"

export const useTaskTable = () => {
  const [data, setData] = React.useState<TaskItem[]>([])
  const [editingCell, setEditingCell] = React.useState<Cell | null>(null)

  const onCreateRowAtEnd = React.useCallback(() => {
    const newRow: TaskItem = {
      id: `Task-${Date.now()}`,
      title: "",
      completed: false,
    }
    setData((prev) => [...prev, newRow])
  }, [])

  const deleteRow = React.useCallback((id: string) => {
    setData(prevData => prevData.filter(row => row.id !== id))
    setEditingCell(null)
  }, [])

  const handleCellEdit = React.useCallback((rowId: string, columnId: string) => {
    setEditingCell({ rowId, columnId })
  }, [])

  const handleCellSave = React.useCallback((rowId: string, columnId: string, value: string) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === rowId
          ? { ...row, [columnId]: value }
          : row
      )
    )
    setEditingCell(null)
  }, [])

  const handleStatusToggle = React.useCallback((rowId: string, completed: boolean) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === rowId
          ? { ...row, completed }
          : row
      )
    )
  }, [])

  const columns = React.useMemo(
    () =>
      getTaskTableColumns({
        onDelete: deleteRow,
        editingCell,
        onCellEdit: handleCellEdit,
        onCellSave: handleCellSave,
        onStatusToggle: handleStatusToggle,
      }),
    [deleteRow, editingCell, handleCellEdit, handleCellSave, handleStatusToggle]
  )

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return {
    table,
    columns,
    onCreateRowAtEnd,
  }
}

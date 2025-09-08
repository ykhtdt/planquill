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

  const sortedData = React.useMemo(() => {
    return data.toSorted((a, b) => a.order - b.order)
  }, [data])

  const maxOrder = React.useMemo(() => {
    return data.reduce((max, item) => Math.max(max, item.order), -1)
  }, [data])

  const onCreateRowAtEnd = React.useCallback(() => {
    const newRow: TaskItem = {
      id: `Task-${Date.now()}`,
      title: "",
      completed: false,
      order: maxOrder + 1,
    }
    setData((prev) => [...prev, newRow])
  }, [maxOrder])

  const onCreateRowBefore = React.useCallback((rowId: string) => {
    const targetIndex = sortedData.findIndex(item => item.id === rowId)

    if (targetIndex === -1) {
      return
    }

    const targetRow = sortedData[targetIndex]
    if (!targetRow) {
      return
    }

    const previousRow = targetIndex > 0 ? sortedData[targetIndex - 1] : null
    const previousOrder = previousRow ? previousRow.order : targetRow.order - 1
    const newOrder = (previousOrder + targetRow.order) / 2

    const newRow: TaskItem = {
      id: `Task-${Date.now()}`,
      title: "",
      completed: false,
      order: newOrder,
    }

    setData(prev => [...prev, newRow])
  }, [sortedData])

  const onCreateRowAfter = React.useCallback((rowId: string) => {
    const targetIndex = sortedData.findIndex(item => item.id === rowId)

    if (targetIndex === -1) {
      return
    }

    const targetRow = sortedData[targetIndex]
    if (!targetRow) {
      return
    }

    const nextRow = targetIndex < sortedData.length - 1 ? sortedData[targetIndex + 1] : null
    const nextOrder = nextRow ? nextRow.order : targetRow.order + 1
    const newOrder = (targetRow.order + nextOrder) / 2

    const newRow: TaskItem = {
      id: `Task-${Date.now()}`,
      title: "",
      completed: false,
      order: newOrder,
    }

    setData(prev => [...prev, newRow])
  }, [sortedData])

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
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return {
    table,
    columns,
    onCreateRowAtEnd,
    onCreateRowBefore,
    onCreateRowAfter,
  }
}

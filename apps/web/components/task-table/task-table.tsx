"use client"

import * as React from "react"

import { flexRender } from "@tanstack/react-table"

import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"

import { TaskTableCreateRowTrigger } from "./task-table-create-row-trigger"
import { useTaskTable } from "@/hooks/use-task-table"

export const TaskTable = () => {
  const {
    table,
    onCreateRowAtEnd,
    onCreateRowBefore,
    onCreateRowAfter,
  } = useTaskTable()

  const isEmptyData = table.getRowModel().rows?.length === 0

  return (
    <div className="space-y-2">
      <div className="relative overflow-visible rounded-sm border">
        <div className={cn("grid grid-cols-[auto_3fr_0.5fr_auto] font-medium", isEmptyData && "border-b")}>
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <div key={header.id} className="flex items-center p-2 text-sm h-11">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </div>
            ))
          )}
        </div>

        <div className="relative">
          {!isEmptyData ? (
            table.getRowModel().rows.map((row, index) => (
              <div key={row.id} className="border-t">
                <TaskTableCreateRowTrigger
                  rowId={row.original.id}
                  onCreate={onCreateRowBefore}
                />
                <div className="grid grid-cols-[auto_3fr_0.5fr_auto] hover:bg-muted/50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <div
                      key={cell.id}
                      className="flex items-center justify-center text-sm h-12 p-2 min-w-0"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </div>
                {index === table.getRowModel().rows.length - 1 && (
                  <TaskTableCreateRowTrigger
                    rowId={row.original.id}
                    onCreate={onCreateRowAfter}
                  />
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-24 p-4">
              <Button variant="outline" size="sm" onClick={onCreateRowAtEnd} className="text-sm rounded-sm">
                Create Task
              </Button>
            </div>
          )}
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={onCreateRowAtEnd} className="text-sm rounded-sm">
        Create Task
      </Button>
    </div>
  )
}

"use client"

import * as React from "react"

import { flexRender } from "@tanstack/react-table"

import { Button } from "@workspace/ui/components/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

import { useTaskTable } from "@/hooks/use-task-table"

export const TaskTable = () => {
  const {
    table,
    columns,
    onCreateRowAtEnd,
  } = useTaskTable()

  return (
    <div className="flex flex-col gap-2 overflow-auto">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      maxWidth: header.getSize(),
                      minWidth: header.column.columnDef.minSize || 0
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                        minWidth: cell.column.columnDef.minSize || 0
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <Button variant="outline" size="sm" onClick={onCreateRowAtEnd} className="text-sm rounded-sm">
                    Create Task
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-start">
        <Button variant="outline" size="sm" onClick={onCreateRowAtEnd} className="text-sm rounded-sm">
          Create Task
        </Button>
      </div>
    </div >
  )
}

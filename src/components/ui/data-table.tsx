"use client"

import {
  ColumnDef,
  OnChangeFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { useCallback, useEffect, useRef } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSortingChange,
  sort,
  isFetching,
  fetchNextPage,
}: DataTableProps<TData, TValue> & { onSortingChange?: OnChangeFn<SortingState>, sort?: SortingState, isFetching?: boolean, fetchNextPage?: () => void }) {
  const table = useReactTable({
    data,
    columns,
    onSortingChange,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sort
    },
  })

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight, clientWidth } = containerRefElement
        //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can

        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          clientWidth > 0 &&
          !isFetching &&
          fetchNextPage
        ) {
          fetchNextPage()
        }
      }
    },
    [fetchNextPage, isFetching, data.length]
  )

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current)
  }, [fetchMoreOnBottomReached])

  return (
    <div ref={tableContainerRef} onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)} className="relative w-full h-full overflow-auto overscroll-contain">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} style={{ width: header.getSize(), minWidth: header.column.columnDef.minSize }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (isFetching ? null : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>))

          }
        </TableBody>
      </Table>
      {isFetching ?
        <div className="fixed bottom-0 py-24 md:py-16 flex items-center justify-center w-full">
          <div className="bg-muted/50 p-4 rounded-lg w-24 h-24 flex items-center justify-center">
            <Loader2 className="animate-spin w-full h-full" />
          </div>
        </div> : null}
    </div>
  )
}
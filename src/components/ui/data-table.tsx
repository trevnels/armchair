"use client"

import {
  ColumnDef,
  ColumnPinningState,
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
import { cn } from "@/lib/utils"
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
  columnPinning,
  isFetching,
  fetchNextPage,
}: DataTableProps<TData, TValue> & { onSortingChange?: OnChangeFn<SortingState>, sort?: SortingState, columnPinning: ColumnPinningState, isFetching?: boolean, fetchNextPage?: () => void }) {
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
    initialState: {
      columnPinning
    }
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
    <>
      <div ref={tableContainerRef} onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)} className="relative w-full h-full overflow-auto overscroll-contain">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        minWidth: header.column.columnDef.minSize,
                        maxWidth: header.column.columnDef.maxSize,
                        left: header.column.getIsPinned() ? header.column.getStart() : undefined,
                      }}
                      className={cn(header.column.getIsPinned() === 'left' ? 'sticky' : '')}
                    >
                      {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
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
                    <TableCell key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        left: cell.column.getIsPinned() ? cell.column.getStart() : undefined,
                      }}
                      className={cn(cell.column.getIsPinned() === 'left' ? 'sticky' : '')}>
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

      </div >
      {
        (isFetching) ?
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-muted/50 p-4 rounded-lg w-24 h-24 flex items-center justify-center">
            <Loader2 className="animate-spin w-full h-full" />
          </div>
          : null
      }
    </>
  )
}
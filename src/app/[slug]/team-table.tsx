"use client"

import { ColumnDef } from "@tanstack/react-table";
import type { TeamPerformance } from "./page";
import { DataTable } from "@/components/ui/data-table";
import { tabular } from "./cells";

export const columns: ColumnDef<TeamPerformance>[] = [
    {
        accessorKey: "key",
        header: "Team",
        cell: tabular,
        size: 100,
        maxSize: 100
    },
    {
        accessorKey: "random",
        header: "Random",
        enableSorting: true,
    }
]

export function TeamTable(props: {data: TeamPerformance[]}) {
    return <DataTable data={props.data} columns={columns} />
}
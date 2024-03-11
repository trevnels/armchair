"use client"

import { ColumnDef } from "@tanstack/react-table";

export function deriveColDefs(data: any) {
    const keys = Object.keys(data[0].epa.breakdown);
    console.log(keys)
    return [
        {
            id: "team",
            header: "team",
            accessorFn: (row: any) => row.team
        },
        {
            id: "team_name",
            header: "team_name",
            accessorFn: (row: any) => row.team_name
        },
        ...keys.map((key) => {
            return {
                id: key,
                header: key,
                accessorFn: (row: any) => row.epa.breakdown[key].mean
            }
        })
    ]

}

export function derive() {
    return "test"
}

export const colDefs: ColumnDef<any>[] = [
    {
        id: "team",
        header: "Team",
        accessorFn: (row: any) => row.team
    },
    {
        id: "points",
        header: "Total Points",
        accessorFn: (row: any) => row.epa.total_points.mean.toFixed(2) + "±" + row.epa.total_points.sd.toFixed(2)
    },
]
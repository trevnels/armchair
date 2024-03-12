"use client"

import { TeamAvatar } from "@/components/avatar";
import { ColumnDef } from "@tanstack/react-table";

export function deriveColDefs(data: any) {
    // console.log(data)
    const keys = Object.keys(data[0].epa.breakdown);
    return [
        {
            id: "avatar",
            header: "Avatar",
            accessorFn: (row: any) => { return { year: row.year, team: "frc" + row.team } },
            cell: (row: any) => {
                return <TeamAvatar year={row.getValue().year} team={row.getValue().team} />
            },
        },
        {
            id: "team",
            header: "Team Number",
            accessorFn: (row: any) => row.team
        },
        {
            id: "team_name",
            header: "Team Name",
            accessorFn: (row: any) => row.team_name
        },
        ...keys.map((key) => {
            return {
                id: key,
                header: convertHeader(key),
                accessorFn: (row: any) => row.epa.breakdown[key],
                cell: (row: any) => {
                    return <div className="text-center leading-none">{row.getValue().mean.toFixed(2)}<br /><span className="text-muted-foreground text-xs">{row.getValue().sd.toFixed(2)}</span></div>
                }
            }
        })
    ]

}

function convertHeader(key: string) {
    // replace underscores with spaces and capitalize the first letter of each word
    return key.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ").replace("Rp", "RP")


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
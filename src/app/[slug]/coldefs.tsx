"use client"

import { TeamAvatar } from "@/components/avatar/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";

const standardizedKeyMap: Record<string, string> = {
    'total_points': 'epa',
    'auto_points': 'auto_epa',
    'teleop_points': 'teleop_epa',
    'endgame_points': 'endgame_epa',
    'tiebreaker_points': 'tiebreaker_epa'
}

export function deriveColDefs(data: any[]) {
    if (data.length === 0) {
        return []
    }

    const keys = Object.keys(data[0].epa.breakdown);

    const defs: ColumnDef<any>[] = [
        {
            id: "index",
            header: "#",
            accessorFn: (row: any, index: number) => index + 1,
            maxSize: 50,
            minSize: 50,
            cell: (row: any) => <div className="text-center text-muted-foreground text-xs">{row.getValue()}</div>
        },
        {
            id: "avatar",
            header: "",
            accessorFn: (row: any) => { return { year: row.year, team: "frc" + row.team, name: row.name || row.team_name } },
            cell: (row: any) => {
                return <TeamAvatar year={row.getValue().year} team={row.getValue().team} name={row.getValue().name} />
            },
        },
        {
            id: "team",
            header: "Team Number",
            accessorFn: (row: any) => row.team
        },
        {
            id: "name",
            header: "Team Name",
            minSize: 200,
            accessorFn: (row: any) => row.name || row.team_name
        }
    ]

    let rpIdx = 1;
    let compIdx = 1;
    for (let i = 0; i < keys.length; i++) {
        // convert breakdown keys to standard keys above:
        let key = keys[i];

        if (standardizedKeyMap[key]) {
            key = standardizedKeyMap[key];
        } else if (key.includes("_rp")) {
            key = "rp_" + rpIdx + "_epa"
            rpIdx++
        } else {
            key = "comp_" + compIdx + "_epa"
            compIdx++;
        }

        defs.push({
            id: key,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
                        className="py-1 px-3"
                    >
                        {convertHeader(keys[i])}

                        {column.getIsSorted() === "desc" ? (
                            <ArrowDownIcon className="ml-2 h-4 w-4 text-white" />
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4 text-white" />
                        ) : (
                            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                )
            },
            accessorFn: (row: any) => row.epa.breakdown[keys[i]],
            cell: (row: any) => <div className="text-center"><span className="text-lg">{row.getValue().mean.toFixed(2)}</span>&nbsp;<span className="text-muted-foreground text-xs">&plusmn;{row.getValue().sd.toFixed(2)}</span></div>,

        } as ColumnDef<any>)
    }

    return defs
}

function convertHeader(key: string) {
    // replace underscores with spaces and capitalize the first letter of each word
    return key.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ").replace("Rp", "RP").replace("Points", "Pts")


}

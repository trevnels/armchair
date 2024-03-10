import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import prisma from "@/hooks/usedb"
import { ColumnDef } from "@tanstack/react-table"
import { get } from "http"
import { TeamTable } from "./team-table"

export type TeamPerformance = {
    key: string
    random: number
}



async function getData(): Promise<TeamPerformance[]> {
    // Fetch data from your API here.
    return (await prisma.team.findMany()).map((t) => {
        return {
            key: t.key.replace(/^frc/, ''),
            random: Math.random()
        }
    })
}

export default async function SlugTest({ params }: { params: { slug: string } }) {

    let data = await getData() 

    return <TeamTable data={data} />

}
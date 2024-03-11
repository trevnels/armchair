"use client";
import { DataTable } from "@/components/ui/data-table";
import { deriveColDefs } from "./coldefs";

export default function ClientGrid({ data }: { data: any }) {
    return (
        <DataTable data={data} columns={deriveColDefs(data)} />
    )
}
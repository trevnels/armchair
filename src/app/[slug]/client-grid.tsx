"use client";
import { DataTable } from "@/components/ui/data-table";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { deriveColDefs } from "./coldefs";

export default function ClientGrid({ slug }: { slug: string }) {

    const [sort, setSort] = useState<SortingState>([{ // TODO: sync this with url params
        id: 'epa',
        desc: true
    }])

    const fetchStandings = async ({ pageParam }: { pageParam: number }) => {
        const params = new URLSearchParams()
        params.set('offset', pageParam.toString())

        if (sort.length > 0) {
            params.set('sort', sort[0].id)
            params.set('dir', sort[0].desc ? 'desc' : 'asc')
        }

        const url = `/api/standings/${slug}?` + params.toString()

        const res = await fetch(url)
        return res.json()
    }

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ['standings', slug, sort],
        queryFn: fetchStandings,
        initialPageParam: 0,
        placeholderData: keepPreviousData,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < 100) return undefined
            return allPages.length * 100
        }
    })

    const colDefs = useMemo(() => {
        if (data === undefined) {
            console.log("no data")
            return []
        }
        console.log("deriving coldefs")
        return deriveColDefs(data.pages.flat())
    }, [data?.pages[0][0]?.year])

    if (status === 'error') return <div>Error: {error.message}</div>
    // if (status === 'pending') return <div>Loading...</div>

    return (
        <DataTable data={data?.pages.flat() || []} columns={colDefs} onSortingChange={setSort} sort={sort} isFetching={isFetching} fetchNextPage={() => {
            if (hasNextPage) {
                console.log("fetching next page")
                fetchNextPage()
            } else {
                console.log("no more pages")
            }
        }} />
    )
}
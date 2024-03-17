"use client";
import useSWRImmutable from "swr/immutable";
import { Skeleton } from "./ui/skeleton";

export function TeamAvatar({ year, team }: { year: number, team: string }) {

    const { data, error, isLoading } = useSWRImmutable(`/api/avatar/${year}/${team}`, async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch avatar");
        }
        return res.text();
    })


    if (isLoading) {
        return <AvatarSkeleton />
    }

    if (error) {
        return <span>{error.message}</span>
    }

    if (data === '') {
        return <></>
    }

    return <div className="relative w-12 h-12 rounded overflow-clip mx-auto flex justify-center items-center bg-zinc-500">
        <img src={data} className="w-full h-full p-0.5 rounded-sm" role="avatar" draggable={false} />
    </div>

}

export function AvatarSkeleton() {
    return <Skeleton className="w-8 h-8 rounded mx-auto" />
}
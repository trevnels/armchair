"use client";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { placeholderAvatar } from "./placeholder";

export function TeamAvatar({ year, team }: { year: number, team: string }) {
    return <div className="w-8 h-8 rounded-md overflow-clip mx-auto flex justify-center items-center bg-accent p-0.5" >
        <Image src={`/api/avatar/${year}/${team}`} alt="" className="w-full h-full rounded-sm" role="avatar" draggable={false} width={48} height={48} quality={90} unoptimized placeholder={placeholderAvatar} />
    </ div >
}

export function AvatarSkeleton() {
    return <Skeleton className="w-8 h-8 rounded mx-auto" />
}
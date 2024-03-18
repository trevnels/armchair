"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "./ui/button";

export function NavbarButton(
    props: {
        segment: string,
        children: React.ReactNode
    },

) {

    const params = useParams<{ slug: string }>();
    const slice = useSelectedLayoutSegment() ?? '';

    const active = slice === props.segment;
    const linkTarget = (active || props.segment === '') ? `/${params.slug}` : `/${params.slug}/${props.segment}`;

    return (
        <Button variant={active ? "secondary" : "ghost"} className={cn("w-12 h-12 px-2 flex-grow md:flex-grow-0", (props.segment === '' ? 'md:hidden' : ''))} asChild={true}>
            <Link href={linkTarget}>{props.children}</Link>
        </Button>
    )

}
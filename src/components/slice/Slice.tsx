import { ReactNode } from "react";

export default function Slice({ children, title, subtitle }: { children?: ReactNode, title: string, subtitle: string }) {
    return <div className="w-72 bg-zinc-900 flex-grow md:flex-grow-0 flex flex-col">
        <SliceTitle leader={title}>{subtitle}</SliceTitle>
        <div className="p-2 overflow-y-auto flex-grow">
            {children}
        </div>
    </div>
}

function SliceTitle({ children, leader }: { children: ReactNode, leader: string }) {
    return (
        <div className="leading-none h-16 border-b border-zinc-800 flex flex-col justify-center p-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest select-none">{leader}</span>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight select-none">{children}</h3>
        </div>
    )
}
import { Loader2 } from "lucide-react";
import { Skeleton } from "./skeleton";

export function Spinner() {
    return <Loader2 className="animate-spin" />
}

export function SliceSpinner() {
    return <div className="flex flex-col w-full gap-2 p-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-4/6" />
        <Skeleton className="h-8 w-10/12" />
    </div>
}


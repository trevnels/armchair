import { CellContext } from "@tanstack/react-table";
import { TeamPerformance } from "./page";

export function tabular({ row }: CellContext<TeamPerformance, unknown>) {
    return <span className="tabular-nums">{row.getValue('key')}</span>
}
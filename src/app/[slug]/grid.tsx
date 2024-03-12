import { getEventStandings } from "@/hooks/statbotics";
import { processSlug } from "@/lib/slug";
import ClientGrid from "./client-grid";

export default async function Table({ event }: { event: string }) {
    const slugType = await processSlug(event);

    if (slugType !== 'event') {
        return (
            <div>
                TODO
            </div>
        );
    }

    const standings = (await getEventStandings(event)).sort((a: any, b: any) => {
        return b.epa.total_points.mean - a.epa.total_points.mean;
    })

    return (<ClientGrid data={standings} />)
}
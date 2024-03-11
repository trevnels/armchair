import { getDistricts, getEvent, getEventMatches, getEvents } from "@/hooks/tba";
import { Calendar, MapPinned } from "lucide-react";
import Link from "next/link";
import type { Match } from "tba-api-client";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import MatchResult from "./MatchResult";
import Slice from "./Slice";

export async function SeasonSlice({ year }: { year: string }) {
    const districts = await getDistricts(Number(year));
    const events = (await getEvents(Number(year))).sort((a, b) => a.start_date!.localeCompare(b.start_date!));

    return (
        <>
            Districts:

            <div className="grid grid-cols-4 gap-2">
                {districts.map((district) => <Button key={district.abbreviation} asChild variant="outline"><Link href={`/${district.key}/explorer`} >{district.abbreviation}</Link></Button>)}
            </div>




            <h5 className="leading-10 text-lg font-medium">Active Events</h5>


            {events.map((event) => <Link href={`/${event.key}/explorer`}>
                <Card key={event.key} className="mb-1 p-2 leading-none">
                    <span className="font-medium">{event.event_type_string === "District Championship" ? "District Championship" : (event.short_name || event.name)}</span><br />
                    <span className="text-muted-foreground text-xs">{event.district?.display_name || event.event_type_string}</span>
                </Card>
            </Link>)}


        </>
    )

}

export async function DistrictSlice({ district }: { district: string }) {
    const year = Number(district.slice(0, 4));
    const districts = await getDistricts(year);
    const districtData = districts.find((d) => d.key === district)
    const displayName = districtData?.display_name || "?";

    return (
        <Slice title="District Explorer" subtitle={displayName}>
            <div className="flex flex-row gap-2 mt-2">
                <Button className="flex-grow" asChild><Link href={`/${year}/explorer`}><Calendar size="1.25rem" className="me-1" /> {year}</Link></Button>
            </div>
        </Slice>
    )
}

export async function EventSlice({ event }: { event: string }) {
    const eventData = await getEvent(event);

    return (
        <Slice title="Event Explorer" subtitle={eventData.short_name || eventData.name}>

            <div className="flex flex-row gap-2 mt-2">
                <Button className="flex-grow" asChild><Link href={`/${eventData.year}/explorer`}><Calendar size="1.25rem" className="me-1" /> {eventData.year}</Link></Button>
                {eventData.district && <Button className="flex-grow" asChild><Link href={`/${eventData.district?.key}/explorer`}><MapPinned size="1.25rem" className="me-1" /> {eventData.district.abbreviation.toUpperCase()}</Link></Button>}
            </div>

            <MatchList eventKey={event} />
        </Slice >
    )
}

export async function MatchList({ eventKey }: { eventKey: string }) {
    const matches = (await getEventMatches(eventKey)).sort((a, b) => a.time! - b.time!);
    const doubleElim = Number(eventKey.slice(0, 4)) >= 2023;

    let grouped = Object.groupBy(matches, (match: Match) => match.comp_level)

    const compLevelNames: Record<string, string> = {
        "qm": "Qualification Matches",
        "qf": "Quarterfinals Matches",
        "sf": (doubleElim) ? "Elimination Matches" : "Semifinals Matches",
        "f": "Finals Matches"
    };

    return Object.keys(grouped).map(
        (compLevel) => <section key={compLevel}>
            <h5 className="leading-10 text-lg font-medium">{compLevelNames[compLevel]}</h5>
            {grouped[compLevel].map((match: Match) => <MatchResult key={match.key} match={match} doubleElim={doubleElim} />)}
        </section>
    )


}
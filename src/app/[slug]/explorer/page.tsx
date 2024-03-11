import MatchResult from "@/components/slice/MatchResult";
import Slice from "@/components/slice/Slice";
import { getDistricts, getEvent, getEventMatches } from "@/hooks/tba";
import { getSeasonName, processSlug } from "@/lib/utils";
import Link from "next/link";

export default async function ExplorerSlice({ params }: { params: { slug: string } }) {

    const slugType = await processSlug(params.slug);

    switch (slugType) {
        case 'season':
            return <SeasonSlice year={params.slug} />;
        case 'district':
            return <DistrictSlice district={params.slug} />;
        case 'event':
            return <EventSlice event={params.slug} />;
        default:
            return (
                <div>
                    Invalid slug
                </div>
            );
    }
}

export async function SeasonSlice(props: { year: string }) {
    const districts = await getDistricts(Number(props.year));

    return (
        <Slice title={"Season Explorer - " + props.year} subtitle={getSeasonName(Number(props.year)).toUpperCase()}>
            Districts:
            <ul>
                {districts.map((district) => <li key={district.abbreviation}><Link href={`/${district.key}/explorer`} >{district.display_name}</Link></li>)}
            </ul>

            Active Events:

        </Slice>
    )

}

export async function DistrictSlice(props: { district: string }) {
    const year = Number(props.district.slice(0, 4));
    const districts = await getDistricts(year);
    const dist = districts.find((d) => d.key === props.district)?.display_name || "?";

    return (
        <Slice title={"District Explorer - " + year} subtitle={dist}>

        </Slice>
    )
}

export async function EventSlice(props: { event: string }) {
    const event = await getEvent(props.event);

    return (
        <Slice title="Event Explorer" subtitle={event.short_name || "Unknown"}>
            <MatchList eventKey={props.event} />
        </Slice>
    )
}

export async function MatchList(props: { eventKey: string }) {
    const matches = (await getEventMatches(props.eventKey)).sort((a, b) => a.time! - b.time!);

    return (
        <div>
            <h1>Match List for {props.eventKey}</h1>
            {matches.map((match) => <MatchResult match={match} key={match.key} />)}
        </div>
    )
}
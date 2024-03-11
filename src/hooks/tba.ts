import type { District_List, Event, Match } from "tba-api-client";

const TBA_KEY = process.env.TBA_KEY;

export async function getDistricts(year: number): Promise<District_List[]> {

    const res = await fetch(`https://www.thebluealliance.com/api/v3/districts/${year}`, {
        headers: {
            "X-TBA-Auth-Key": TBA_KEY!
        },
        next: {
            revalidate: 2629800
        }
    });
    return res.json();
}

export async function getEvent(eventKey: string): Promise<Event> {
    const res = await fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}`, {
        headers: {
            "X-TBA-Auth-Key": TBA_KEY!
        },
        next: {
            revalidate: 86400
        }
    });
    return res.json();
}

export async function getEventMatches(eventKey: string): Promise<Match[]> {
    const res = await fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`, {
        headers: {
            "X-TBA-Auth-Key": TBA_KEY!
        },
        next: {
            revalidate: 60
        }
    });
    return res.json();
}
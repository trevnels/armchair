export async function getEventStandings(eventKey: string) {
    const res = await fetch(`https://api.statbotics.io/v3/team_events?event=${eventKey}`)
    return res.json()
}
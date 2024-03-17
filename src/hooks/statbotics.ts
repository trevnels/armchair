
export interface StatboticsSort {
    key: string
    direction: 'asc' | 'desc'
}

// sort keys: keyname (+_sd?)
// team
// epa
// auto_epa
// teleop_epa
// endgame_epa
// rp_1_epa
// rp_2_epa
// tiebreaker_epa
// comp_1_epa
// comp_2_epa
// comp_3_epa
// ...
// comp_18_epa

// refer to https://github.com/avgupta456/statbotics/blob/master/backend/src/breakdown.py for comp_n mappings
// they are in order in breakdown data following tiebreaker

// TODO: look into fixing team number sorting, since the upstream API does it lexicographically instead of numerically

export async function getEventStandings(eventKey: string, offset: number = 0, sort: StatboticsSort = { key: 'epa', direction: 'desc' }) {

    const url = new URL(`https://api.statbotics.io/v3/team_events`)

    if (sort.key === 'name') {
        // handle inconsistency between team_event and team_year models
        sort.key = 'team_name'
    }

    url.searchParams.set('event', eventKey)
    url.searchParams.set('limit', '100')
    url.searchParams.set('metric', sort.key)
    url.searchParams.set('ascending', sort.direction === 'asc' ? 'true' : 'false')
    url.searchParams.set('offset', offset.toString())

    console.log(url)
    const res = await fetch(url, {
        next: {
            revalidate: eventKey.startsWith('2024') ? 900 : 2629800 // 2024 events should revalidate every 15 minutes, previous seasons should revalidate every 30 days
        }
    })

    return res.json()
}

// TODO: merge getDistrictStandings and getSeasonStandings since they are almost identical

export async function getDistrictStandings(districtKey: string, offset: number = 0, sort: StatboticsSort = { key: 'team', direction: 'asc' }) {

    // break district key (i.e.) 2024fnc into year and district code. this needs error handling eventually
    const year = districtKey.substring(0, 4)
    const code = districtKey.substring(4)

    const url = new URL(`https://api.statbotics.io/v3/team_years`)

    url.searchParams.set('year', year)
    url.searchParams.set('district', code)
    url.searchParams.set('limit', '100')
    url.searchParams.set('metric', sort.key)
    url.searchParams.set('ascending', sort.direction === 'asc' ? 'true' : 'false')
    url.searchParams.set('offset', offset.toString())

    const res = await fetch(url, {
        next: {
            revalidate: districtKey.startsWith('2024') ? 1800 : 2629800 // 2024 districts should revalidate every 30 minutes, previous seasons should revalidate every 30 days
        }
    })

    return res.json()
}

export async function getSeasonStandings(year: string, offset: number = 0, sort: StatboticsSort = { key: 'team', direction: 'asc' }) {

    const url = new URL(`https://api.statbotics.io/v3/team_years`)

    url.searchParams.set('year', year)
    url.searchParams.set('limit', '100')
    url.searchParams.set('metric', sort.key)
    url.searchParams.set('ascending', sort.direction === 'asc' ? 'true' : 'false')
    url.searchParams.set('offset', offset.toString())

    const res = await fetch(url, {
        next: {
            revalidate: year.startsWith('2024') ? 1800 : 2629800 // 2024 seasons should revalidate every 30 minutes, previous seasons should revalidate every 30 days
        }
    })

    return res.json()
}
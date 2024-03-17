import { StatboticsSort, getDistrictStandings, getEventStandings, getSeasonStandings } from "@/hooks/statbotics"
import { processSlug } from "@/lib/slug"

export async function GET(
    request: Request,

    { params }: { params: { slug: string } }
) {
    // consume search params for sort and page
    const { searchParams } = new URL(request.url)

    const sort = searchParams.get('sort')
    const direction = searchParams.get('dir') ?? 'desc'
    const offset = Number(searchParams.get('offset') ?? 0)

    if (isNaN(offset)) {
        return new Response('Invalid offset', { status: 400 })
    }

    if (direction !== 'asc' && direction !== 'desc') {
        return new Response('Invalid direction', { status: 400 })
    }

    const slug = params.slug

    let sortObj: StatboticsSort | undefined = undefined
    if (sort) {
        sortObj = { key: sort, direction: direction }
    }

    const slugType = await processSlug(slug)

    if (slugType === null) {
        return new Response('Invalid slug', { status: 400 })
    }

    const queryFn = {
        event: getEventStandings,
        district: getDistrictStandings,
        season: getSeasonStandings
    }[slugType]

    const standings = await queryFn(slug, offset, sortObj)
    return Response.json(standings)
}
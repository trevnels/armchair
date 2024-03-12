import { getDistricts } from "@/hooks/tba"
import "server-only"

export async function processSlug(slug: string) {
    // get year from slug, should be first 4 characters
    const year = Number(slug.slice(0, 4))

    // if year is not a number, return null
    if (isNaN(year)) {
        return null
    }

    // get remainder of slug
    const remainder = slug.slice(4)

    // if remainder is empty, we are looking at the whole season
    if (remainder === "") {
        return 'season'
    }

    // check if remainder is a district
    const districts: any[] = await getDistricts(year)

    if (districts.some((district: any) => district.abbreviation === remainder)) {
        return 'district'
    }

    // if remainder is not a district, assume it is an event
    return 'event'
}
import { getDistricts } from "@/hooks/tba"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export function getSeasonName(year: number) {
  switch (year) {
    case 2024:
      return "Crescendo"
    case 2023:
      return "Charged Up"
    case 2022:
      return "Rapid React"
    case 2021:
      return "Infinite Recharge (2021)"
    case 2020:
      return "Infinite Recharge"
    case 2019:
      return "Destination: Deep Space"
    case 2018:
      return "Power Up"
    case 2017:
      return "Steamworks"
    default:
      return "Unknown"
  }
}
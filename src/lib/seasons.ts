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
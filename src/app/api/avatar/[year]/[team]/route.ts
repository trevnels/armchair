import { getAvatar } from "@/hooks/tba";

export const dynamic = 'force-static'

export async function GET(
    request: Request,
    { params }: { params: { year: string, team: string } }
) {
    let avatar = await getAvatar(params.team, Number(params.year))


    if (!avatar) {
        return new Response("", { headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=86400" } })
    }

    return new Response("data:image/png;base64," + avatar, { headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=604800" } })
}
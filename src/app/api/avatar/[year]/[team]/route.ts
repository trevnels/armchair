import { placeholderAvatar } from "@/components/avatar/placeholder";
import { getAvatar } from "@/hooks/tba";

export const dynamic = 'force-static'

const placeholder = Buffer.from(placeholderAvatar.split(',')[1], 'base64')

export async function GET(
    request: Request,
    { params }: { params: { year: string, team: string } }
) {
    let avatar = await getAvatar(params.team, Number(params.year))

    if (!avatar) {
        return new Response(placeholder, {
            headers: {
                "Content-Type": "image/svg+xml", "Content-Length": placeholder.length.toString(), "Cache-Control": "public, max-age=604800"
            }
        })
    }

    let img = Buffer.from(avatar, 'base64')
    return new Response(img, {
        headers: {
            "Content-Type": "image/png", "Content-Length": img.length.toString(), "Cache-Control": "public, max-age=604800"
        }
    })
}
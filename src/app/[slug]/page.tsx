import useDb from "@/hooks/usedb"


export default async function SlugTest({params}: {params: {slug: string}}) {

    let prisma = useDb()
    
    let teams = await prisma.team.findMany()

    return <ul>{teams.map(t => 
        <li key={t.key}>{t.key}</li>
    )}</ul>

}
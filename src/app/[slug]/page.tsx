export default function SlugTest({params}: {params: {slug: string}}) {

    return <p>{params.slug} {process.env.PGDATABASE || "none"}</p>

}
import { notFound } from "next/navigation";

export default function TeamSlice({ params }: { params: { slug: string, team: string } }) {

    const teamNum = Number(params.team);

    if (isNaN(teamNum)) {
        return notFound();
    }

    return <></>;

}
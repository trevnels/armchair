import { DistrictSlice, EventSlice, SeasonSlice } from "@/components/slice/ExplorerSlices";
import Slice from "@/components/slice/Slice";
import { getSeasonName } from "@/lib/seasons";
import { processSlug } from "@/lib/slug";

export default async function ExplorerSlice({ params }: { params: { slug: string } }) {

    const slugType = await processSlug(params.slug);


    switch (slugType) {
        case 'season':
            return <Slice title={"Season Explorer - " + params.slug} subtitle={getSeasonName(Number(params.slug)).toUpperCase()}>
                <SeasonSlice year={params.slug} />
            </Slice>;
        case 'district':
            return <DistrictSlice district={params.slug} />;
        case 'event':
            return <EventSlice event={params.slug} />;
        default:
            return (
                <div>
                    Invalid slug
                </div>
            );
    }
}

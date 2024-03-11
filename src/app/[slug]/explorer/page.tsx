import { DistrictSlice, EventSlice, SeasonSlice } from "@/components/slice/ExplorerSlices";
import { processSlug } from "@/lib/utils";

export default async function ExplorerSlice({ params }: { params: { slug: string } }) {

    const slugType = await processSlug(params.slug);

    switch (slugType) {
        case 'season':
            return <SeasonSlice year={params.slug} />;
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

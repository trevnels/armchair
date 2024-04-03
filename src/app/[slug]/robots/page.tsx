import Slice from "@/components/slice/Slice";

export default async function RobotsSlice({ params }: { params: { slug: string } }) {

    return (
        <Slice title="Pit View" subtitle="TBD">

            {/* <div className="grid grid-cols-2 gap-1 my-2">
                {Array.from({ length: 51 }).map((_, i) => (
                    <Card className="leading-none overflow-hidden p-1" key={i}>
                        <Image src="https://i.imgur.com/jobw9fch.jpg" alt="Robot 1" className="rounded" width={400} height={300} />
                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight select-none">6502</h3>
                        <p className="text-xs text-muted-foreground uppercase select-none">DARC SIDE</p>
                    </Card>
                ))
                }
            </div> */}

        </Slice>
    )

}
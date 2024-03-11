import { NavbarButton } from "@/components/navbar";
import { getEventStandings } from "@/hooks/statbotics";
import { processSlug } from "@/lib/utils";
import { Compass } from "lucide-react";
import { ReactNode } from "react";


export default async function MainLayout({
  children,
  params
}: { children: ReactNode, params: { slug: string } }) {


  const slugType = await processSlug(params.slug);

  const standings = (slugType === 'event') ? (await getEventStandings(params.slug)) : []

  if (slugType === null) {
    return (
      <div>
        Invalid slug
      </div>
    )
  }


  return (
    <main className="flex flex-row h-full [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block">
      <div className="w-16 bg-zinc-900 border-r border-zinc-800 flex flex-col gap-2 py-2 items-center">
        <NavbarButton segment="explorer">
          <Compass />
        </NavbarButton>
      </div>
      {children}
      <div className="flex-grow md:block">
        DataTable<br />
        {standings.map((team: any) => {
          return (
            <div key={team.team}>
              {team.epa.total_points.mean.toFixed(2)}
            </div>
          )
        })}
      </div>
    </main>
  )
}
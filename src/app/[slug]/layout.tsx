import { NavbarButton } from "@/components/navbar";
import { AreaChart, Armchair, Wand2 } from "lucide-react";
import { ReactNode } from "react";
import ClientGrid from "./client-grid";

export const dynamic = 'error'

export default function MainLayout({
  children,
  params
}: { children: ReactNode, params: { slug: string } }) {

  // const slugType = await processSlug(params.slug);


  // if (slugType === null) {
  //   return (
  //     <div>
  //       Invalid slug
  //     </div>
  //   )
  // }


  return (
    <main className="flex flex-row h-dvh [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block">
      <div className="w-16 border-r flex flex-col gap-2 py-2 items-center flex-shrink-0">
        <NavbarButton segment="explorer">
          <Armchair />
        </NavbarButton>
        <NavbarButton segment="insights">
          <AreaChart />
        </NavbarButton>
        <NavbarButton segment="predictor">
          <Wand2 />
        </NavbarButton>
      </div>
      {children}
      <div className="flex-grow md:block min-w-0 h-dvh">
        <ClientGrid slug={params.slug} />
      </div>
    </main>
  )
}
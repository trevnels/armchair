import { NavbarButton } from "@/components/navbar";
import { AreaChart, Compass, Table, Wand2 } from "lucide-react";
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
    <main className="flex flex-col-reverse md:flex-row h-dvh [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block w-full">
      <div className="w-full md:w-16 h-16 md:h-full border-t md:border-r md:border-t-0 flex flex-row md:flex-col gap-2 py-0 md:py-2 px-2 md:px-0 flex-shrink-0 items-center">
        <NavbarButton segment="">
          <Table />
        </NavbarButton>
        <NavbarButton segment="explorer">
          <Compass />
        </NavbarButton>
        <NavbarButton segment="insights">
          <AreaChart />
        </NavbarButton>
        <NavbarButton segment="predictor">
          <Wand2 />
        </NavbarButton>
      </div>
      {children}
      <div className="flex-grow min-w-0 min-h-0">
        <ClientGrid slug={params.slug} />
      </div>
    </main>
  )
}
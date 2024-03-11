import { NavbarButton } from "@/components/navbar";
import { SliceSpinner } from "@/components/ui/spinner";
import { Compass } from "lucide-react";
import { ReactNode, Suspense } from "react";
import Table from "./grid";

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
          <Compass />
        </NavbarButton>
      </div>
      {children}
      <div className="flex-grow md:block overflow-x-auto">
        {
          <Suspense fallback={<SliceSpinner />}>
            <Table event={params.slug} />
          </Suspense>}
      </div>
    </main>
  )
}
import { Suspense } from "react";
import BreadcrumbSkeleton from "~/components/breacrumbSkeleton";
import BreadcrumbComponent from "~/components/breadcrumbComponent";

export default async function FoldersLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<{id:string}>
}) {
    return (
        <>
        <Suspense fallback={<BreadcrumbSkeleton/>}>
          <BreadcrumbComponent id={(await (params)).id} />
        </Suspense>
            {children}
        </>
    )
}
import { Suspense } from "react";
import BreadcrumbSkeleton from "~/components/breacrumbSkeleton";
import BreadcrumbComponent from "~/components/breadcrumbComponent";


interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{id:string}>
}
export default async function FoldersLayout({children, params}:LayoutProps) {
    return (
        <>
            <Suspense fallback={<BreadcrumbSkeleton />}>
                <BreadcrumbComponent id={(await (params)).id} />
            </Suspense>
            {children}
        </>
    );
}

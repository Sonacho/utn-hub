import { Suspense } from "react";
import BreadcrumbSkeleton from "~/components/breacrumbSkeleton";
import BreadcrumbComponent from "~/components/breadcrumbComponent";


interface LayoutProps {
    children: React.ReactNode;
    params: {id:string}
}
export default function FoldersLayout({children, params}:LayoutProps) {
    return (
        <>
            <Suspense fallback={<BreadcrumbSkeleton />}>
                <BreadcrumbComponent id={params.id} />
            </Suspense>
            {children}
        </>
    );
}

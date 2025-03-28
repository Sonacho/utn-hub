import { Suspense } from "react";
import BreadcrumbSkeleton from "~/components/breacrumbSkeleton";
import BreadcrumbComponent from "~/components/breadcrumbComponent";

export default function FoldersLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    return (
        <>
            <Suspense fallback={<BreadcrumbSkeleton />}>
                <BreadcrumbComponent id={params.id} />
            </Suspense>
            {children}
        </>
    );
}

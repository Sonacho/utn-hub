import BreadcrumbComponent from "~/components/breadcrumbComponent";


export default async function FoldersLayout({
    params,
    children
    }: {
    params: Promise<{ id: string }>,
    children: Readonly<{ children: React.ReactNode}>
    }){
        return(
        <>
            <BreadcrumbComponent/>
            {children}
        </>
        )
}
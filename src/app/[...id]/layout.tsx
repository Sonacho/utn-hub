import BreadcrumbComponent from "~/components/breadcrumbComponent";

export default async function FoldersLayout({
    children
    }: {
    children: Readonly<{ children: React.ReactNode}>
    }){
        return(
        <>
            <BreadcrumbComponent/>
            {children}
        </>
        )
}
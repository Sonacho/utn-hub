import BreadcrumbComponent from "~/components/breadcrumbComponent";

export default async function FoldersLayout({
    children
    }: {
    children:React.ReactNode
    }){
        return(
        <>
            <BreadcrumbComponent/>
            {children}
        </>
        )
}

import React from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import getFolderPath from "~/utils/getFolderPath"


export default async function BreadcrumbComponent({id}:{id:Promise<string[]>}){


    const idArray = await id;
    const links = await getFolderPath(idArray[idArray.length-1]!)
    links.shift()
    const subLinks = links.map((e) => {
        return {name:decodeURI(e.split("+")[0]!), path:e.split("+")[1]}
    })
    return links &&  (
        <Breadcrumb className="container pb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {subLinks.map((e,i) => {
                return(
                    <React.Fragment key={i}>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${e.path}`}>{e.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    </React.Fragment>
                )
            })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

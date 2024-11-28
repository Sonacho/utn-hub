"use client"
import { usePathname } from "next/navigation"
import React from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"


export default function BreadcrumbComponent(){

    
    const links = usePathname().split("/")
    links.shift()
    const subLinks = links.map((e,i) => {
        return {name:decodeURI(e), path:links.slice(0,i+1).join("/")}
    })
    return links &&  (
        <Breadcrumb className="container pb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {subLinks.map((e,i) => {
                return(
                    <React  .Fragment key={i}>
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

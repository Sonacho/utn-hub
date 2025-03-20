import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb"

export default function BreadcrumbSkeleton() {
  return (
    <Breadcrumb className="container pb-4">
      <BreadcrumbList>
        {Array.from(Array(5)).map((e,i) => {
          return(
          <BreadcrumbItem key={i}>
            <div className="h-4 w-16 bg-gray-300 dark:bg-slate-700 rounded animate-pulse"></div>
            {i != 4 && <BreadcrumbSeparator/>}
          </BreadcrumbItem>
          )
        })
      }
      </BreadcrumbList>
    </Breadcrumb>
  )
}

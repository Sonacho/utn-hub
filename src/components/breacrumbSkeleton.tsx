import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export default function BreadcrumbSkeleton() {
  return (
    <Breadcrumb className="container pb-4">
      <BreadcrumbList>
        {Array.from(Array(5)).map((e, i) => {
          return (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                <div className="h-4 w-16 animate-pulse rounded bg-gray-300 dark:bg-slate-700"></div>
              </BreadcrumbItem>
              {i != 4 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

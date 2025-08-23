import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

export default async function BreadcrumbComponent({
  path,
}: {
  path: string[];
}) {
  const links = path;
  const subLinks = links.map((e) => {
    return { name: decodeURI(e.split("+")[0]!), path: e.split("+")[1] };
  });
  function cutPath(segment: string): string {
    const fullPath = links.join("/");
    const parts = fullPath.split("/");
    const index = parts.indexOf(segment);

    if (index === -1) return fullPath; // segment not found, return original
    return parts.slice(0, index + 1).join("/");
  }
  return (
    links && (
      <Breadcrumb className="container pb-4">
        <BreadcrumbList>
          {subLinks.map((e, i) => {
            return (
              <React.Fragment key={i}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/${i ? cutPath(encodeURI(e.name)) : ""}`}
                  >
                    {e.name === "UTN" ? "Home" : e.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {i != subLinks.length - 1 ? <BreadcrumbSeparator /> : ""}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    )
  );
}

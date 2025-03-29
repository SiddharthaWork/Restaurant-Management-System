import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
const SharedBredcrumb = () => {
  const pathname = useLocation().pathname;
  const pathsegments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="text-gray-600 hover:text-blue-600"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem> */}
        {pathsegments.map((segment, index) => {
          const href = "/" + pathsegments.slice(0, index + 1).join("/");
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <Link className="font-semibold text-gray-600" to={href}>
                  {segment
                    .replace(/-/g, " ")
                    .split(" ")
                    .map((item) => item[0].toUpperCase() + item.slice(1))
                    .join("")}
                </Link>
              </BreadcrumbItem>
              {index < pathsegments.length - 1 && (
                <BreadcrumbSeparator>
                  /
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default SharedBredcrumb;

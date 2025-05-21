import { ReactElement } from "react";
import { BreadcrumbItem } from "../../../ui-materialui";
import { useResourceBreadcrumbPaths } from "./useResourceBreadcrumbPaths";

export type ResourceBreadcrumbItemProps = {
  resource: string;
  path?: string;
};

export const ResourceBreadcrumbItem = ({
    resource,
}: ResourceBreadcrumbItemProps): ReactElement => {
    const resourcesPaths = useResourceBreadcrumbPaths(resource);
    const listPath = resourcesPaths[resource];
    const childPaths = Object.keys(resourcesPaths)
        .filter(name => name !== resource)
        .reduce(
            (acc, name) => ({
                ...acc,
                [name.substring(resource.length + 1)]: resourcesPaths[name],
            }),
            {}
        );

    return (
        <BreadcrumbItem name={resource} {...listPath}>
            {Object.keys(childPaths).map(name => (
                <BreadcrumbItem key={name} name={name} {...childPaths[name]} />
            ))}
        </BreadcrumbItem>
    );
};

import { ReactElement } from "react";
import { ResourceBreadcrumbItem } from "./ResourceBreadcrumbItem";
import { useResourceDefinitions } from "../../../frame";

export type ResourceBreadcrumbItemsProps = { resources?: string[] };

export const ResourceBreadcrumbItems = ({
    resources: selectedResources,
}: ResourceBreadcrumbItemsProps): ReactElement => {
    const resourceDefinitions = useResourceDefinitions();

    const resources = Object.values(resourceDefinitions)
        .filter(
            resource =>
                !selectedResources || selectedResources.includes(resource.name)
        )
        .map(resource => resource.name);

    return (
        <>
            {resources.map(name => (
                <ResourceBreadcrumbItem key={name} resource={name} />
            ))}
        </>
    );
};

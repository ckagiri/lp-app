import { generatePath, useParams } from "react-router";
import {
  ResourceItem,
  useBasename,
  useCreatePath,
  useResourceDefinition,
} from "../../../frame";
import { BreadcrumbPath } from "../../../ui-materialui";

export type BreadcrumbPathMap = Record<string, BreadcrumbPath>;

export const useResourceBreadcrumbPaths = (
  resource: ResourceItem
): BreadcrumbPathMap => {
  const resourceDefinition = useResourceDefinition({
    resource,
  });
  const createPath = useCreatePath();
  const basename = useBasename();
  const params = useParams();
  const resourceRoute = String(resource.route);
  const pathKey = resourceRoute.replace(/\/:[^:/]+\//g, ".edit.");
  const resourcePath = generatePath(resourceRoute, params);

  const competitionPath = {
    ["competition"]: {
      label: "Competitons",
      to: `${basename}/${resource}`,
    },
    [`${pathKey}.create`]: {
      label: !resourceDefinition.hasList ? "Create Competition" : "Create",
      to: createPath({
        resource: resourcePath,
        type: "create",
      }),
    },
    [`${pathKey}.edit`]: {
      label: (pathContext: any) => {
        const competition = pathContext["competitions"];
        return !competition ? "Edit" : competition.name;
      },
      to: (pathContext: any) => {
        const competition = pathContext["competitions"];
        return competition
          ? createPath({
              resource: resourcePath,
              id: competition.slug,
              type: "edit",
            })
          : "";
      },
    },
    [`${pathKey}.show`]: {
      label: (pathContext: any) => {
        const competition = pathContext["competitions"];
        return !competition ? "Show" : competition.name;
      },
      to: (pathContext: any) => {
        const competition = pathContext["competitions"];
        return competition
          ? createPath({
              resource: resourcePath,
              id: competition.slug,
              type: "show",
            })
          : "";
      },
    },
  };

  const resourcePaths: BreadcrumbPathMap = {
    ...competitionPath,
  };

  return resourcePaths;
};

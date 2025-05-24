import { generatePath, useParams } from "react-router";
import {
  ResourceItem,
  useBasename,
  useCreatePath,
} from "../../../frame";
import { BreadcrumbPath } from "../../../ui-materialui";

export type BreadcrumbPathMap = Record<string, BreadcrumbPath>;
export type ResourceBreadcrumbPathMap = Record<string, BreadcrumbPathMap>;

export const useResourceBreadcrumbPaths = (
  resource: ResourceItem
): BreadcrumbPathMap => {
  const createPath = useCreatePath();
  const basename = useBasename();
  const resourceName = resource.name ?? '';

  const competitionsKey = "competitions";
  const competitionsPath = {
    [competitionsKey]: {
      label: "Competitions",
      to: `${basename}/competitions`,
    },
    [`${competitionsKey}.create`]: {
      label: "Create",
      to: createPath({
        resource: "competitions",
        type: "create",
      }),
    },
    [`${competitionsKey}.edit`]: {
      label: (pathContext: any) => {
        const competition = pathContext["competitions"];
        return !competition ? "Edit" : competition.name;
      },
      to: (pathContext: any) => {
        const competition = pathContext["competitions"];
        return competition
          ? createPath({
              resource: "competitions",
              id: competition.slug,
              type: "edit",
            })
          : "";
      },
    },
    [`${competitionsKey}.show`]: {
      label: (pathContext: any) => {
        const competition = pathContext["competitions"];
        return !competition ? "Show" : competition.name;
      },
      to: (pathContext: any) => {
        const competition = pathContext["competitions"];
        return competition
          ? createPath({
              resource: "competitions",
              id: competition.slug,
              type: "show",
            })
          : "";
      },
    },
  };

  const seasonsKey = "competitions.edit.seasons";
  const seasonsPath = {
    [seasonsKey]: {
      label: "Seasons",
      to: (pathContext: any) => {
        const competition = pathContext["competitions"];
        return competition
          ? `${basename}/competitions/${competition.slug}/seasons`
          : "";
      },
    },
    [`${seasonsKey}.create`]: {
      label: "Create",
      to: createPath({
        resource: "seasons",
        type: "create",
      }),
    },
    [`${seasonsKey}.edit`]: {
      label: (pathContext: any) => {
        const season = pathContext["seasons"];
        return !season ? "Edit" : season.name;
      },
      to: (pathContext: any) => {
        const competition = pathContext["competitions"];
        const season = pathContext["seasons"];
        return competition && season
          ? createPath({
              resource: `competitons/${competition.slug}/seasons`,
              id: season.slug,
              type: "edit",
            })
          : "";
      },
    },
    [`${seasonsKey}.show`]: {
      label: (pathContext: any) => {
        const season = pathContext["seasons"];
        return !season ? "Show" : season.name;
      },
      to: (pathContext: any) => {
        const competition = pathContext["competitions"];
        const season = pathContext["seasons"];
        return competition
          ? createPath({
              resource: `competitons/${competition.slug}/seasons`,
              id: season.slug,
              type: "show",
            })
          : "";
      },
    },
  };

  const resourcePaths: ResourceBreadcrumbPathMap = {
    competitions: competitionsPath,
    seasons: seasonsPath,
  };

  return resourcePaths[resourceName] ?? {};
};

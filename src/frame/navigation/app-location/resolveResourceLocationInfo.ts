import { generatePath, matchPath } from "react-router";
import { Identifier, ResourceDefinition, ResourceItem } from "../../types";

export const resolveResourceLocationInfo = (
  pathname: string,
  resources: ResourceDefinition[]
): ResourceLocationInfo[] => {
  const matchedLocations = resources
    .map((resource) => {
      const match = matchPath({ path: resource.route, end: false}, pathname);

      if (match) {
        console.log("match", match);
        return {
          resource,
          params: match.params,
        };
      }
      return null;
    })
    .filter((location) => location !== null)
    .map((location) => {
      const { resource: resourceDefinition, params: pathParams } = location as {
        resource: ResourceDefinition;
        params: Record<string, string>;
      };
      const { route: resourceRoute, name } = resourceDefinition;
      const isExactMatch = matchPath({ path: resourceRoute, end: true }, pathname) != null;

      const resourcePath = generatePath(resourceRoute, pathParams);
      const pathKey = pathname.replace(/\/:[^:/]+\//g, ".edit.");

      const createMatch = pathname.match(`^/${resourcePath}/create(/([^/]*))?$`);
      if (createMatch) {
        return {
          resource: { name, route: resourceRoute, path: resourcePath, },
          pathKey: `${pathKey}.create`,
          isExactMatch,
        };
      }

      const showMatch = pathname.match(`^/${resourcePath}/([^/]+)/show(/([^/]*))?$`);
      if (showMatch) {
        return {
          resource: { name, path: resourcePath, },
          pathKey: `${pathKey}.show`, recordId: showMatch[1],
          isExactMatch,
        };
      }

      const editMatch = pathname.match(`^/${resourcePath}/([^/]+)(/([^/]*))?$`);
      if (editMatch) {
        return {
          resource: { name, path: resourcePath},
          pathKey: `${pathKey}.edit`, recordId: editMatch[1],
          isExactMatch,
        };
      }

      const listMatch = pathname.match(`^/${resourcePath}/?$`);
      if (listMatch) {
        return {
          resource: { name, path: resourcePath },
          pathKey,
          isExactMatch,
        };
      }
      return null;
    })
    .filter((location) => location !== null);
  return matchedLocations;
};

export type ResourceLocationInfo = {
  resource: ResourceItem;
  recordId?: Identifier;
  pathKey: string;
  isExactMatch: boolean;
};

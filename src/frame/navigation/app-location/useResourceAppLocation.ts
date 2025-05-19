import { useLocation } from "react-router-dom";
import { useGetOne } from "../../dataProvider";
import { useBasename } from "../../routing";
import { useResourceDefinitions } from "../../core";
import { AppLocation } from "./AppLocationContext";
import { resolveResourceLocationInfo } from "./resolveResourceLocationInfo";

export const useResourceAppLocation = (): AppLocation | null => {
  const { pathname } = useLocation();
  const basename = useBasename();
  const relativePath = pathname.replace(basename, "");
  const resources = useResourceDefinitions();

  const resourceLocationInfo = resolveResourceLocationInfo(
    relativePath,
    Object.values(resources)
  );

  const pathContext = resourceLocationInfo.reduce(
    (acc: Record<string, any>, locationInfo) => {
      if (!locationInfo.resource.name || !locationInfo.resource.path) {
        return acc;
      }
      const { data: record } = useGetOne(
        locationInfo.resource.path,
        {
          id: locationInfo.recordId,
        },
        { enabled: locationInfo.recordId != null }
      );
      acc[locationInfo.resource.name] = record;
      return acc;
    },
    {} as Record<string, any>
  );


  if (pathname === "/") {
    return {
      path: "",
      values: {},
    };
  }

  if (resourceLocationInfo.length === 0) {
    return null;
  }

  const exactLocationInfo = resourceLocationInfo.find((locationInfo) => locationInfo.isExactMatch);
  return {
    path: exactLocationInfo?.pathKey || "",
    values: { ...pathContext },
  };
};

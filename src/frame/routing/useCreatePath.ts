import { useCallback } from "react";
import { useBasename } from "./useBasename";
import { Identifier } from "../types";

export const useCreatePath = () => {
  const basename = useBasename();
  return useCallback(
    ({ parent, resource, id, type }: CreatePathParams): string => {
      if (["list", "create", "edit", "show"].includes(type) && !resource) {
        throw new Error("Cannot create a link without a resource path.");
      }
      switch (type) {
        case "list":
          return parent
            ? removeDoubleSlashes(`${basename}/${parent}/${resource}`)
            : removeDoubleSlashes(`${basename}/${resource}`);
        case "show": {
          if (id == null) {
            // maybe the id isn't defined yet
            // instead of throwing an error, fallback to list link
            return removeDoubleSlashes(`${basename}/${resource}`);
          }
          return removeDoubleSlashes(
            `${basename}/${resource}/${encodeURIComponent(id)}/show`
          );
        }
        default:
          return type;
      }
    },
    [basename]
  );
};

export interface CreatePathParams {
  type: string;
  resource?: string;
  parent?: string;
  id?: Identifier;
}

export const removeDoubleSlashes = (path: string) => path.replace("//", "/");

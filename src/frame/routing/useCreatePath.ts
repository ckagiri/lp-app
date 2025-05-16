import { useCallback } from 'react';
import { useBasename } from './useBasename';

export const useCreatePath = () => {
  const basename = useBasename();
  return useCallback(
    ({ parent, resource, type }: CreatePathParams): string => {
      if (
        ['list', 'create', 'edit', 'show'].includes(type) && !resource
      ) {
        throw new Error(
          'Cannot create a link without a resource path.'
        );
      }
      switch (type) {
        case 'list':
          return parent
            ? removeDoubleSlashes(`${basename}/${parent}/${resource}`)
            : removeDoubleSlashes(`${basename}/${resource}`);
        default:
          return type;
      }
    }, [basename]
  );
};

export interface CreatePathParams {
  type: string;
  resource?: string;
  parent?: string;
}

export const removeDoubleSlashes = (path: string) => path.replace('//', '/');
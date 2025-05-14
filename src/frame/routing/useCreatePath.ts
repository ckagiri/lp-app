import { useCallback } from 'react';
import { useBasename } from './useBasename';

export const useCreatePath = () => {
  const basename = useBasename();
  return useCallback(
    ({ resourcePath, type }: CreatePathParams): string => {
      if (
        ['list', 'create', 'edit', 'show'].includes(type) && !resourcePath
      ) {
        throw new Error(
          'Cannot create a link without a resource-path.'
        );
      }
      switch (type) {
        case 'list':
          return removeDoubleSlashes(`${basename}/${resourcePath}`);
        default:
          return type;
      }
    }, [basename]
  );
};

export interface CreatePathParams {
  type: string;
  resourcePath?: string;
}

export const removeDoubleSlashes = (path: string) => path.replace('//', '/');
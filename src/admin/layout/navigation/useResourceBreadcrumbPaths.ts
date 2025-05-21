import { UiRecord, useBasename, useCreatePath } from "../../../frame";
import { BreadcrumbPath } from "../../../ui-materialui";

export type BreadcrumbPathMap = Record<string, BreadcrumbPath>;

export const useResourceBreadcrumbPaths = (
    resource: string
): BreadcrumbPathMap => {
    const resourceDefinition = useResourceDefinition({
        resource,
    });
    const createPath = useCreatePath();
    const basename = useBasename();
    const getRecordRepresentation = useGetRecordRepresentation(resource);

    const resourcePaths: BreadcrumbPathMap = {
        [resource]: {
            label: resourceLabelPlural,
            to: `${basename}/${resource}`,
        },
        [`${resource}.create`]: {
            label: !resourceDefinition.hasList
                ? translate('ra.page.create', {
                      name: resourceLabelSingular,
                  })
                : translate('ra.action.create'),
            to: createPath({
                resource: resource,
                type: 'create',
            }),
        },
        [`${resource}.edit`]: {
            label: ({ record }: { record: UiRecord }) => {
                const recordRepresentation = getRecordRepresentation(record);
                if (typeof recordRepresentation !== 'string') {
                    return `#${record.id}`;
                }

                return !record
                    ? translate('ra.action.edit')
                    : !resourceDefinition.hasList
                      ? translate('ra.page.edit', {
                            name: resourceLabelSingular,
                            id: record.id,
                            record,
                            recordRepresentation,
                        })
                      : recordRepresentation;
            },
            to: ({ record }: { record: UiRecord }) =>
                record
                    ? createPath({
                          resource: resource,
                          id: record.id,
                          type: 'edit',
                      })
                    : '',
        },
        [`${resource}.show`]: {
            label: ({ record }: { record: UiRecord }) => {
                const recordRepresentation = getRecordRepresentation(record);
                if (typeof recordRepresentation !== 'string') {
                    return `#${record.id}`;
                }

                return !record
                    ? translate('ra.action.show')
                    : !resourceDefinition.hasList
                      ? translate('ra.page.show', {
                            name: resourceLabelSingular,
                            id: record.id,
                            record,
                            recordRepresentation,
                        })
                      : recordRepresentation;
            },
            to: ({ record }: { record: UiRecord }) =>
                record
                    ? createPath({
                          resource,
                          id: record.id,
                          type: 'show',
                      })
                    : '',
        },
    };

    return resourcePaths;
};

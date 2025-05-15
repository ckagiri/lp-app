import { stringify } from 'query-string';
import { CreateParams, CreateResult, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, fetchUtils, GetManyParams, GetManyResult, GetOneParams, GetOneResult, Identifier, QueryFunctionContext, UiRecord, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult } from '../frame';

export default (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson,
): DataProvider => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
    const { field, order } = params.sort || { field: 'id', order: 'ASC' };

    const rangeStart = (page - 1) * perPage;
    const rangeEnd = page * perPage - 1;

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([rangeStart, rangeEnd]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const options = { signal: params?.signal };

    return httpClient(url, options).then(({ headers, json }) => {
      const total = headers.get('x-total-count');
      return {
        data: json,
        total: total ? parseInt(total, 10) : json.length,
      };
    });
  },
  getOne: function <RecordType extends UiRecord = any>(resource: string, params: GetOneParams<RecordType> & QueryFunctionContext): Promise<GetOneResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  getMany: function <RecordType extends UiRecord = any>(resource: string, params: GetManyParams<RecordType> & QueryFunctionContext): Promise<GetManyResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  update: function <RecordType extends UiRecord = any>(resource: string, params: UpdateParams): Promise<UpdateResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  updateMany: function <RecordType extends UiRecord = any>(resource: string, params: UpdateManyParams): Promise<UpdateManyResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  create: function <RecordType extends Omit<UiRecord, 'id'> = any, ResultRecordType extends UiRecord = RecordType & { id: Identifier; }>(resource: string, params: CreateParams): Promise<CreateResult<ResultRecordType>> {
    throw new Error('Function not implemented.');
  },
  delete: function <RecordType extends UiRecord = any>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  deleteMany: function <RecordType extends UiRecord = any>(resource: string, params: DeleteManyParams<RecordType>): Promise<DeleteManyResult<RecordType>> {
    throw new Error('Function not implemented.');
  }
})

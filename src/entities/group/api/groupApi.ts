import { mockGroups, type ListParams } from '@shared/api';

import type { Group } from '../model/types';

export const groupApi = {
  list: (params: ListParams = {}) =>
    mockGroups.list(params) as Promise<{
      data: Group[];
      total: number;
      page: number;
      pageSize: number;
    }>,
  byId: (id: string) => mockGroups.byId(id) as Promise<Group>,
  create: (payload: Partial<Group>) => mockGroups.create(payload) as Promise<Group>,
};

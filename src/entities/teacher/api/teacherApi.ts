import { mockTeachers, type ListParams } from '@shared/api';

import type { Teacher } from '../model/types';

export const teacherApi = {
  list: (params: ListParams = {}) =>
    mockTeachers.list(params) as Promise<{
      data: Teacher[];
      total: number;
      page: number;
      pageSize: number;
    }>,
  byId: (id: string) => mockTeachers.byId(id) as Promise<Teacher>,
};

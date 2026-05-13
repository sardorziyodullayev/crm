import { mockStudents } from '@shared/api';

import type { Student, StudentListQuery } from '../model/types';

export const studentApi = {
  list: (q: StudentListQuery = {}) =>
    mockStudents.list({
      page: q.page,
      pageSize: q.pageSize,
      search: q.search,
      sortBy: q.sortBy as string | undefined,
      sortDir: q.sortDir,
      filters: { status: q.status, branch: q.branch },
    }) as Promise<{ data: Student[]; total: number; page: number; pageSize: number }>,
  byId: (id: string) => mockStudents.byId(id) as Promise<Student>,
  create: (payload: Partial<Student>) => mockStudents.create(payload) as Promise<Student>,
  update: (id: string, patch: Partial<Student>) =>
    mockStudents.update(id, patch) as Promise<Student>,
  remove: (ids: string[]) => mockStudents.delete(ids),
};

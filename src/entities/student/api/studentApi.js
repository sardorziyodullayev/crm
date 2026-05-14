import { mockStudents } from '@shared/api';
export const studentApi = {
    list: (q = {}) => mockStudents.list({
        page: q.page,
        pageSize: q.pageSize,
        search: q.search,
        sortBy: q.sortBy,
        sortDir: q.sortDir,
        filters: { status: q.status, branch: q.branch },
    }),
    byId: (id) => mockStudents.byId(id),
    create: (payload) => mockStudents.create(payload),
    update: (id, patch) => mockStudents.update(id, patch),
    remove: (ids) => mockStudents.delete(ids),
};

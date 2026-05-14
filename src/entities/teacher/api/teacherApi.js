import { mockTeachers } from '@shared/api';
export const teacherApi = {
    list: (params = {}) => mockTeachers.list(params),
    byId: (id) => mockTeachers.byId(id),
};

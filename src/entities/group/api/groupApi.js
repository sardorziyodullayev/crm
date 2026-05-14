import { mockGroups } from '@shared/api';
export const groupApi = {
    list: (params = {}) => mockGroups.list(params),
    byId: (id) => mockGroups.byId(id),
    create: (payload) => mockGroups.create(payload),
};

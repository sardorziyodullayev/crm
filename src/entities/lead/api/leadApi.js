import { mockLeads } from '@shared/api';
export const leadApi = {
    list: () => mockLeads.list(),
    funnel: () => mockLeads.funnel(),
    updateStatus: (id, status) => mockLeads.updateStatus(id, status),
    create: (payload) => mockLeads.create(payload),
};

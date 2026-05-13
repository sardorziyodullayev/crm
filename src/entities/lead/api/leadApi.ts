import { mockLeads } from '@shared/api';

import type { FunnelColumn, Lead, LeadStatus } from '../model/types';

export const leadApi = {
  list: () => mockLeads.list() as Promise<Lead[]>,
  funnel: () => mockLeads.funnel() as Promise<FunnelColumn[]>,
  updateStatus: (id: string, status: LeadStatus) => mockLeads.updateStatus(id, status),
  create: (payload: Partial<Lead>) => mockLeads.create(payload) as Promise<Lead>,
};

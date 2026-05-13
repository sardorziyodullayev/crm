import { mockPayments, type ListParams } from '@shared/api';

import type { Payment, PaymentStats } from '../model/types';

export const paymentApi = {
  list: (params: ListParams = {}) =>
    mockPayments.list(params) as Promise<{
      data: Payment[];
      total: number;
      page: number;
      pageSize: number;
    }>,
  stats: () => mockPayments.stats() as Promise<PaymentStats>,
  create: (payload: Partial<Payment>) => mockPayments.create(payload) as Promise<Payment>,
};

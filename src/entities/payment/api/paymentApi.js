import { mockPayments } from '@shared/api';
export const paymentApi = {
    list: (params = {}) => mockPayments.list(params),
    stats: () => mockPayments.stats(),
    create: (payload) => mockPayments.create(payload),
};

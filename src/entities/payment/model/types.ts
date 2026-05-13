export type PaymentMethod = 'cash' | 'card' | 'click' | 'payme' | 'transfer';
export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'refunded';

export interface Payment {
  id: string;
  studentId: string;
  groupId: string;
  amountUZS: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt: string;
  dueAt: string;
  receiptUrl?: string;
  note?: string;
}

export interface PaymentStats {
  totalRevenue: number;
  totalOverdue: number;
  paidCount: number;
  overdueCount: number;
  pendingCount: number;
  refundedCount: number;
}

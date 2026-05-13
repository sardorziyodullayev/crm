export type LeadStatus = 'new' | 'contacted' | 'trial' | 'negotiation' | 'won' | 'lost';
export type LeadSource = 'Instagram' | 'Telegram' | 'Friend referral' | 'Website' | 'Walk-in' | 'Facebook';

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  interest: string;
  assignedTo: string;
  createdAt: string;
  notes: string;
  estimatedValueUZS: number;
}

export interface FunnelColumn {
  stage: LeadStatus;
  items: Lead[];
}

export const LEAD_STAGES: { id: LeadStatus; label: string; accent: string }[] = [
  { id: 'new', label: 'New', accent: 'brand' },
  { id: 'contacted', label: 'Contacted', accent: 'cyan' },
  { id: 'trial', label: 'Trial', accent: 'accent' },
  { id: 'negotiation', label: 'Negotiation', accent: 'warning' },
  { id: 'won', label: 'Won', accent: 'success' },
  { id: 'lost', label: 'Lost', accent: 'danger' },
];

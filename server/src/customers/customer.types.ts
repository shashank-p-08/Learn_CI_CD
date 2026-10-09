export type CustomerStatus = 'active' | 'trial' | 'paused' | 'churned';

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: CustomerStatus;
  plan: 'Starter' | 'Growth' | 'Scale';
  value: number;
  lastContact: string;
  notes: string;
  createdAt: string;
}

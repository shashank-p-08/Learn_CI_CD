export type Status = 'active' | 'trial' | 'paused' | 'churned';
export type Plan = 'Starter' | 'Growth' | 'Scale';
export type Customer = { id: string; name: string; email: string; company: string; role: string; status: Status; plan: Plan; value: number; lastContact: string; notes: string; createdAt: string };
export type CustomerInput = Omit<Customer, 'id' | 'createdAt'>;

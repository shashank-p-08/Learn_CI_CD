import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { Customer } from './customer.types';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

const seed: Customer[] = [
  { id: 'c-1', name: 'Maya Patel', email: 'maya@northstar.io', company: 'Northstar Labs', role: 'VP of Product', status: 'active', plan: 'Scale', value: 48000, lastContact: '2025-02-18', notes: 'Expansion conversation in progress.', createdAt: '2024-10-12' },
  { id: 'c-2', name: 'Jordan Lee', email: 'jordan@arcandco.com', company: 'Arc & Co.', role: 'Founder', status: 'trial', plan: 'Growth', value: 18000, lastContact: '2025-02-16', notes: 'Trial ends next week.', createdAt: '2025-01-08' },
  { id: 'c-3', name: 'Ava Williams', email: 'ava@hearthworks.com', company: 'Hearthworks', role: 'Head of Ops', status: 'active', plan: 'Growth', value: 24000, lastContact: '2025-02-14', notes: '', createdAt: '2024-11-23' },
  { id: 'c-4', name: 'Theo Martin', email: 'theo@kinetic.dev', company: 'Kinetic', role: 'Engineering Lead', status: 'paused', plan: 'Starter', value: 9000, lastContact: '2025-02-09', notes: 'Revisit after their platform migration.', createdAt: '2024-08-19' },
  { id: 'c-5', name: 'Sofia Chen', email: 'sofia@lumahealth.co', company: 'Luma Health', role: 'COO', status: 'active', plan: 'Scale', value: 62000, lastContact: '2025-02-05', notes: 'Strong champion; introduce annual billing.', createdAt: '2024-07-02' }
];

@Injectable()
export class CustomersRepository {
  private readonly file = join(process.cwd(), 'data', 'customers.json');
  private customers: Customer[];

  constructor() {
    const dir = join(process.cwd(), 'data');
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    this.customers = existsSync(this.file) ? JSON.parse(readFileSync(this.file, 'utf8')) : seed;
  }

  private persist() { writeFileSync(this.file, JSON.stringify(this.customers, null, 2)); }
  findAll() { return [...this.customers].sort((a, b) => b.lastContact.localeCompare(a.lastContact)); }
  findOne(id: string) { const customer = this.customers.find(item => item.id === id); if (!customer) throw new NotFoundException('Customer not found'); return customer; }
  create(dto: CreateCustomerDto) { const customer = { ...dto, id: randomUUID(), notes: dto.notes || '', createdAt: new Date().toISOString().slice(0, 10) } as Customer; this.customers.push(customer); this.persist(); return customer; }
  update(id: string, dto: UpdateCustomerDto) { const current = this.findOne(id); Object.assign(current, dto); this.persist(); return current; }
  remove(id: string) { this.findOne(id); this.customers = this.customers.filter(item => item.id !== id); this.persist(); }
}

import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly repository: CustomersRepository) {}
  findAll() { return this.repository.findAll(); }
  findOne(id: string) { return this.repository.findOne(id); }
  create(dto: CreateCustomerDto) { return this.repository.create(dto); }
  update(id: string, dto: UpdateCustomerDto) { return this.repository.update(id, dto); }
  remove(id: string) { return this.repository.remove(id); }
}

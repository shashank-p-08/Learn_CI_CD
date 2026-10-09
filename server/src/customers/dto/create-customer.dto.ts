import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateCustomerDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsEmail() email!: string;
  @IsString() @IsNotEmpty() company!: string;
  @IsString() @IsNotEmpty() role!: string;
  @IsIn(['active', 'trial', 'paused', 'churned']) status!: string;
  @IsIn(['Starter', 'Growth', 'Scale']) plan!: string;
  @IsNumber() @Min(0) value!: number;
  @IsString() @IsNotEmpty() lastContact!: string;
  @IsOptional() @IsString() notes?: string;
}

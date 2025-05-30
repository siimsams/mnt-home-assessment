import { IsOptional, IsString } from 'class-validator';

export class GetOrdersFilterDto {
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() paymentDescription?: string;
}

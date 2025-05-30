import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class GetOrdersFilterDto {
  @IsOptional()
  @IsString({ each: true })
  countryCodes?: string[];

  @IsOptional()
  @IsString()
  paymentDescription?: string;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(0)
  @Type(() => Number)
  page?: number;
}

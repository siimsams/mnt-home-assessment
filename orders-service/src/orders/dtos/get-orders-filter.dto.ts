import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetOrdersFilterDto {
  @IsOptional()
  @IsString({ each: true })
  @Transform(
    ({
      value,
    }: {
      value: string | string[] | undefined;
    }): string[] | undefined => {
      if (!value) return undefined;
      return Array.isArray(value) ? value : [value];
    },
  )
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

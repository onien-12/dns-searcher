import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PriceRangeDto {
  @IsNumber()
  min: number;

  @IsNumber()
  max: number;
}

export class GetProductsDto {
  @IsString()
  query: string;

  @IsOptional()
  @ValidateNested()
  @IsObject()
  @Type(() => PriceRangeDto)
  price?: PriceRangeDto;
}

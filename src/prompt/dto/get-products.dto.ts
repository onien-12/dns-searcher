import { IsString } from 'class-validator';

export class GetProductsDto {
  @IsString()
  query: string;
}

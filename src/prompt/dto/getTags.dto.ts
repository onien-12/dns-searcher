import { IsString } from 'class-validator';

export class GetTagsDto {
  @IsString()
  query: string;
}

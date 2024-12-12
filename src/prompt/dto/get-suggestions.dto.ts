import { IsString } from 'class-validator';

export class GetSuggestionsDto {
  @IsString()
  query: string;
}

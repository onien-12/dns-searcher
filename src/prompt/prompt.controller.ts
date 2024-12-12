import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { GetProductsDto } from './dto/get-products.dto';
import { GetSuggestionsDto } from './dto/get-suggestions.dto';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  /**
   * Returns a list of relevant products based
   * on the user's query
   */
  @Post('products')
  getProducts(@Body() payload: GetProductsDto) {
    return this.promptService.getProducts(payload.query, payload.price);
  }

  /**
   * Returns a list of suggestions
   */
  @Post('suggestions')
  getSuggestions(@Body() payload: GetSuggestionsDto) {
    return this.promptService.getSuggestions(payload.query);
  }
}

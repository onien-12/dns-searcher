import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { GetProductsDto } from './dto/get-products.dto';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  /**
   * Returns a list of relevant products based
   * on the user's query
   */
  @Post('products')
  getProducts(@Body() payload: GetProductsDto) {
    return this.promptService.getProducts(payload.query);
  }
}

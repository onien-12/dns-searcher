import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { GetTagsDto } from './dto/getTags.dto';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post('tags')
  getTags(@Body() payload: GetTagsDto) {
    return this.promptService.getTags(payload.query);
  }
}

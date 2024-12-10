import { Controller, Get, Query } from '@nestjs/common';
import { DnsService } from './dns.service';

@Controller('dns')
export class DnsController {
  constructor(private readonly dnsService: DnsService) {}

  @Get('search')
  search(@Query('query') query: string) {
    return this.dnsService.search(query);
  }
}

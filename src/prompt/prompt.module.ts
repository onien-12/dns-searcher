import { Module } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { PromptController } from './prompt.controller';
import { DnsModule } from 'src/dns/dns.module';

@Module({
  controllers: [PromptController],
  providers: [PromptService],
  imports: [DnsModule],
})
export class PromptModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DnsModule } from './dns/dns.module';
import { PromptModule } from './prompt/prompt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DnsModule, PromptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

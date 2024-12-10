import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DnsModule } from './dns/dns.module';

@Module({
  imports: [DnsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

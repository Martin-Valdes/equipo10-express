import { Module } from '@nestjs/common';
import { EmailResponseService } from './email-response.service';
import { EmailResponseController } from './email-response.controller';

@Module({
  controllers: [EmailResponseController],
  providers: [EmailResponseService],
})
export class EmailResponseModule {}

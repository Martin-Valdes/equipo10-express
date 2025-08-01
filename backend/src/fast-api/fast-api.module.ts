import { Module } from '@nestjs/common';
import { IntegracionService } from './fast-api.service';
import { IntegracionController } from './fast-api.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [IntegracionController],
  providers: [IntegracionService],
})
export class FastApiModule {}

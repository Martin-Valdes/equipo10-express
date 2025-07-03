import { Module } from '@nestjs/common';
import { TestComponentService } from './test-component.service';
import { MistralController } from './test-component.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MistralController],
  providers: [TestComponentService],
})
export class TestComponentModule {}

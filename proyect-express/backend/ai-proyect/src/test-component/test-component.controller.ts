// src/mistral/mistral.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { TestComponentService } from './test-component.service';
import { AskMistralDto } from './dto/ask-mistral.dto';

@Controller('mistral')
export class MistralController {
  constructor(private readonly mistralService: TestComponentService) {}

  @Post('ask')
  async ask(@Body() dto: AskMistralDto) {
    const result = await this.mistralService.askMistral(dto);
    return { response: result };
  }
}

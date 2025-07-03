// src/mistral/mistral.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AskMistralDto } from './dto/ask-mistral.dto';

@Injectable()

export class TestComponentService {
  constructor(private readonly httpService: HttpService) {}
  async askMistral(dto: AskMistralDto): Promise<string> {
    const apiKey = process.env.MISTRAL_API_KEY;

    const payload = {
      model: 'mistral-small',
      messages: [
        {
          role: 'user',
          content: dto.prompt,
        },
      ],
      temperature: 0.7,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post('https://api.mistral.ai/v1/chat/completions', payload, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error al consultar Mistral:', error.response?.data || error.message);
      throw error;
    }
  }
}

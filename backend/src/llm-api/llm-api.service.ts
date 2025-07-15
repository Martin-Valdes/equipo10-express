import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import { AXIOS_INSTANCE_TOKEN } from '../common/constants/api.constants';
import { Client } from '../client/entities/client.entity';

export interface LlmCompletionResult {
  llmResponseContent: string;
  model: string;
  tokensUsed?: number;
}

interface ILLMResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
    index: number;
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

@Injectable()
export class LlmApiService implements OnModuleInit {
  private readonly logger = new Logger(LlmApiService.name);
  private mistralApiKey: string;

  constructor(
    @Inject(AXIOS_INSTANCE_TOKEN) private readonly apiAxios: AxiosInstance,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    const apiKey = this.configService.get<string>('MISTRAL_API_KEY');
    if (!apiKey) {
      throw new Error(
        'MISTRAL_API_KEY no está configurada en las variables de entorno',
      );
    }
    this.mistralApiKey = apiKey;
    this.logger.debug(`API Key cargada: ***${this.mistralApiKey.slice(-4)}`);

    if (!this.apiAxios.defaults.baseURL) {
      this.apiAxios.defaults.baseURL = 'https://api.mistral.ai/v1';
    }
  }

  async askLLM(prompt: string, client: Client): Promise<LlmCompletionResult> {
    const enrichedPrompt = this.#enrichPrompt(prompt, client);

    const payload = {
      model: 'mistral-small',
      messages: [
        {
          role: 'user',
          content: enrichedPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    };

    try {
      this.logger.log(`Enviando prompt a LLM para cliente ${client.email}`);

      const response = await this.apiAxios.post<ILLMResponse>(
        'https://api.mistral.ai/v1/chat/completions',
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.mistralApiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.data?.choices?.[0]?.message?.content) {
        this.logger.error(
          'Estructura de respuesta inválida de la API LLM',
          response.data,
        );
        throw new Error('Respuesta inválida de la API LLM');
      }

      return {
        llmResponseContent: response.data.choices[0].message.content,
        model: payload.model,
        tokensUsed: response.data.usage?.total_tokens,
      };
    } catch (error) {
      this.logger.error('Error al llamar a la API de Mistral', {
        error: error.response?.data || error.message,
        payload,
      });
      throw new Error(
        `Error en la API LLM: ${error.response?.data?.message || error.message}`,
      );
    }
  }

  #enrichPrompt(prompt: string, client: Client): string {
    const enrichedPrompt = `${prompt}\n\n[Usuario: ${client.email}]`;
    return enrichedPrompt;
  }
}

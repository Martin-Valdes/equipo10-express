import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { AXIOS_INSTANCE_TOKEN } from '../common/constants/api.constants';

export interface LlmCompletionResult {
  llmResponseContent: string;
  rawApiResponse: any;
  model: string;
}

@Injectable()
export class LlmApiService {
  constructor(
    @Inject(AXIOS_INSTANCE_TOKEN) private readonly apiAxios: AxiosInstance,
  ) {}
  async askLLM(prompt: string, data: string): Promise<LlmCompletionResult> {
    // Crear un metodo privado para enriquecer el prompt con los datos dummies
    // const enrichedPrompt = enrich(prompt, data)

    // TODO: mejorar adaptacion y conexion con LLM adecuado
    const payload = {
      provider: 'featherless-ai',
      model: 'mistralai/Mistral-Small-24B-Instruct-2501',
      messages: [
        {
          role: 'user',
          content: prompt + data,
        },
      ],
      temperature: 0.7,
    };
    const response = await this.apiAxios.post(
      '/featherless-ai/v1/chat/completions',
      payload,
    );
    // TODO: mejorar la gestion de errores y el tipado de la respuesta
    if (!response.data.choices) {
      throw new Error('Error con la conexion a la AI');
    }
    const llmResponseContent = response.data.choices[0].message
      .content as string;
    const rawApiResponse = response.data;
    const model = (response.data.model as string) || payload.model;

    return {
      llmResponseContent,
      rawApiResponse,
      model,
    };
  }
}

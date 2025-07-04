import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { AXIOS_INSTANCE_TOKEN } from '../common/constants/api.constants';
import { Client } from '../client/entities/client.entity';

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
  async askLLM(prompt: string, client: Client): Promise<LlmCompletionResult> {
    // Crear un metodo privado para enriquecer el prompt con los datos dummies
    const enrichedPrompt = this.#enrichPrompt(prompt, client);

    // TODO: mejorar adaptacion y conexion con LLM adecuado
    const payload = {
      provider: 'featherless-ai',
      model: 'mistralai/Mistral-Small-24B-Instruct-2501',
      messages: [
        {
          role: 'user',
          content: enrichedPrompt,
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

  #enrichPrompt(prompt: string, client: Client) {
    // Implementar sistema de usuarios para personalizar por empresa
    const head = `TAREA: Redacta un correo de respuesta profesional, cordial y personalizado en nombre de la empresa ${client.company}, usando el contexto del cliente.`;
    const goals = `
OBJETIVOS:
- Responder a la consulta del cliente
- Recomendar productos
- Usar un tono amable, personalizado y acertivo
`;

    const body = `
MENSAJE ORIGINAL DEL CLIENTE
"""
${prompt}
"""
`;
    // let promptHistory = '';
    // for (const historicPrompt of client.emailResponses) {
    //   promptHistory += `*${historicPrompt.prompt}\n`;
    // }
    const clientData = `
DATOS DEL CLIENTE
- NOMBRE: ${client.name} ${client.lastName}
- EMAIL: ${client.email}
- HISTORIAL DE INTERESES: ${client.interests}
- SEGMENTO: ${client.segment}
`;

    const foot = 'No agregues notas adicionales, sugerencias o solicitud de feedback. Solo responde con el mensaje de respuesta al cliente. No uses markdown ni cualquier otro formato de texto enriquecido, solo texto plano con saltos de linea.'
    const enrichedPrompt = `${head}\n${goals}\n${body}\n${clientData}`;
    return enrichedPrompt;
  }
}

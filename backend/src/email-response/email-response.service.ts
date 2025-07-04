import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { LlmApiService } from '../llm-api/llm-api.service';
import { CreateEmailResponseDto } from './dto/create-email-response.dto';
import { EmailResponse } from './entities/email-response.entity';

@Injectable()
export class EmailResponseService {
  constructor(
    @InjectRepository(EmailResponse)
    private readonly emailResponseRepository: Repository<EmailResponse>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly llmService: LlmApiService,
  ) {}

  async create(
    createEmailResponseDto: CreateEmailResponseDto,
  ): Promise<EmailResponse> {
    const { prompt, clientEmail } = createEmailResponseDto;
    const client = await this.clientRepository.findOne({
      where: { email: clientEmail },
      // relations: { emailResponses: true },
    });
    if (!client) {
      throw new NotFoundException('Email no valido. El cliente no existe');
    }
    try {
      const { llmResponseContent, model } = await this.llmService.askLLM(
        prompt,
        client,
      );
      const emailResponse = this.emailResponseRepository.create({
        content: llmResponseContent,
        model: model,
        prompt: prompt,
        client: client,
      });
      await this.emailResponseRepository.save(emailResponse);
      return emailResponse;
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }

  async findAll() {
    const emailReponses = await this.emailResponseRepository.find({
      relations: {
        client: true,
      },
    });
    return emailReponses;
  }

  async findOne(id: number) {
    const emailReponse = await this.emailResponseRepository.findOne({
      where: { id },
      relations: {
        client: true,
      },
    });
    if (!emailReponse) {
      throw new NotFoundException('Email no encontrado');
    }
    return emailReponse;
  }

  async remove(id: number) {
    const emailResponse = await this.emailResponseRepository.findOneBy({ id });
    if (!emailResponse) {
      throw new NotFoundException('El email que intentas eliminar no existe');
    }
    await this.emailResponseRepository.remove(emailResponse);
    return { message: 'Eliminado correctamente', status: 200 };
  }
}

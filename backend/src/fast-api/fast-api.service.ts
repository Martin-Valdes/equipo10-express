import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';
import { RagQueryDto } from './dto/rag-query.dto';

@Injectable()
export class IntegracionService {
  private readonly apiBase = process.env.FASTAPI_URL;

  constructor(private readonly httpService: HttpService) {}

  async checkHealth() {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.apiBase}/healthz`)
    );
    return data;
  }

  async sendPdf(buffer: Buffer, filename: string) {
    const formData = new FormData();
    formData.append('file', buffer, filename);

    const headers = formData.getHeaders();

    const { data } = await firstValueFrom(
      this.httpService.post(`${this.apiBase}/ingest_pdf`, formData, {
        headers,
        maxBodyLength: Infinity,
      })
    );

    return data;
  }

  async queryRag(payload: RagQueryDto) {
    const { data } = await firstValueFrom(
      this.httpService.post(`${this.apiBase}/rag`, payload)
    );
    return data;
  }
}

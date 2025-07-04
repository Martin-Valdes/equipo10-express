import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const createAxiosInstance = (
  configService: ConfigService,
): AxiosInstance => {
  const apiKey: string | undefined = configService.get('LLM_API_KEY');
  const url: string | undefined = configService.get('LLM_API_URL');
  const axiosConfig: AxiosRequestConfig = {
    baseURL: url,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  };
  const api = axios.create(axiosConfig);
  return api;
};

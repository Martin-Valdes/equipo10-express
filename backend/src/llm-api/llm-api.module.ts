import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LlmApiService } from './llm-api.service';
import { AXIOS_INSTANCE_TOKEN } from '../common/constants/api.constants';
import { ConfigService } from '@nestjs/config';
import { createAxiosInstance } from '../config/api.config';

@Module({
  imports: [HttpModule],
  providers: [
    LlmApiService,
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useFactory: (configService: ConfigService) => {
        return createAxiosInstance(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [LlmApiService],
})
export class LlmApiModule {}

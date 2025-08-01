import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IntegracionService } from './fast-api.service';
import { RagQueryDto } from './dto/rag-query.dto';

@Controller('fast-api')
export class IntegracionController {
  constructor(private readonly integracionService: IntegracionService) {}

  @Get('healthz')
  checkHealth() {
    return this.integracionService.checkHealth();
  }

  @Post('ingest_pdf')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== 'application/pdf') {
        return cb(new BadRequestException('Only PDF files are allowed'), false);
      }
      cb(null, true);
    },
  }))
  uploadPdf(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('PDF file is required');
    }
    return this.integracionService.sendPdf(file.buffer, file.originalname);
  }

  @Post('rag')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  consultarRAG(@Body() dto: RagQueryDto) {
    return this.integracionService.queryRag(dto);
  }
}

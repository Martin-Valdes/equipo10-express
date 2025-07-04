import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EmailResponseService } from './email-response.service';
import { CreateEmailResponseDto } from './dto/create-email-response.dto';

@Controller('email-response')
export class EmailResponseController {
  constructor(private readonly emailResponseService: EmailResponseService) {}

  @Post()
  async create(@Body() createEmailResponseDto: CreateEmailResponseDto) {
    const emailResponse = await this.emailResponseService.create(
      createEmailResponseDto,
    );
    return {
      content: emailResponse.content,
      id: emailResponse.id,
    };
  }

  @Get()
  async findAll() {
    return await this.emailResponseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.emailResponseService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailResponseService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailResponseService } from './email-response.service';
import { CreateEmailResponseDto } from './dto/create-email-response.dto';
import { UpdateEmailResponseDto } from './dto/update-email-response.dto';

@Controller('email-response')
export class EmailResponseController {
  constructor(private readonly emailResponseService: EmailResponseService) {}

  @Post()
  create(@Body() createEmailResponseDto: CreateEmailResponseDto) {
    return this.emailResponseService.create(createEmailResponseDto);
  }

  @Get()
  findAll() {
    return this.emailResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailResponseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmailResponseDto: UpdateEmailResponseDto,
  ) {
    return this.emailResponseService.update(+id, updateEmailResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailResponseService.remove(+id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateEmailResponseDto } from './dto/create-email-response.dto';
import { UpdateEmailResponseDto } from './dto/update-email-response.dto';

@Injectable()
export class EmailResponseService {
  create(createEmailResponseDto: CreateEmailResponseDto) {
    return 'This action adds a new emailResponse';
  }

  findAll() {
    return `This action returns all emailResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailResponse`;
  }

  update(id: number, updateEmailResponseDto: UpdateEmailResponseDto) {
    return `This action updates a #${id} emailResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailResponse`;
  }
}

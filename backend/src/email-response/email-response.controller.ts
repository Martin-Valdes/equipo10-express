import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EmailResponseService } from './email-response.service';
import { CreateEmailResponseDto } from './dto/create-email-response.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { EmailResponseDto } from './dto/email-reponse.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from '../auth/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';

@ApiTags('Email AI Response')
@Controller('email-response')
export class EmailResponseController {
  constructor(private readonly emailResponseService: EmailResponseService) {}

  @Post()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.USER)

  @ApiOperation({
    summary:
      'Procesa el email del cliente con IA, asocia un cliente y persiste informacion',
  })
  @ApiBody({
    type: CreateEmailResponseDto,
    description: 'Datos para la solicitud a la IA',
  })
  @ApiResponse({
    status: 201,
    description: 'Respuesta de la operacion procesada exitosamente',
    type: EmailResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({
    status: 503,
    description: 'Error en la comucacion con el modelo de IA',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor o de la API de IA.',
  })
  async create(@Body() createEmailResponseDto: CreateEmailResponseDto) {
    const emailResponseEntity = await this.emailResponseService.create(
      createEmailResponseDto,
    );
    return plainToInstance(EmailResponseDto, emailResponseEntity);
  }

  @Get()
  @ApiOperation({
    summary:
      'Suministra todos los emails generados con IA, incluyendo informacion de los clientes asociados',
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta de la operacion procesada exitosamente',
    type: EmailResponseDto,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
  })
  async findAll() {
    const emailResponsesEntities = await this.emailResponseService.findAll();
    return plainToInstance(EmailResponseDto, emailResponsesEntities);
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Suministra el email generado con IA asociado al id, incluyendo informacion del cliente',
  })
  @ApiParam({
    name: 'id',
    description: 'Id unico del email generado',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta de la operacion procesada exitosamente',
    type: EmailResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Email generado no encontrado' })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
  })
  async findOne(@Param('id') id: string) {
    const emailResponse = await this.emailResponseService.findOne(+id);
    return plainToInstance(EmailResponseDto, emailResponse);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza el email generado con IA asociado al id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id unico del email generado',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta de la operacion procesada exitosamente',
    type: EmailResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Email generado no encontrado' })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateEmailResponseDto: CreateEmailResponseDto,
  ) {
    const emailResponse = await this.emailResponseService.update(
      +id,
      updateEmailResponseDto,
    );
    return plainToInstance(EmailResponseDto, emailResponse);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina de la BD el email generado con IA asociado al id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id unico del email generado',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta de la operacion procesada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Email generado no encontrado' })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
  })
  async remove(@Param('id') id: string) {
    return await this.emailResponseService.remove(+id);
  }
}

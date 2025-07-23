import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UsePipes,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from '../auth/roles.enum';

import { User } from './entities/user.entity';

type PublicUser = Omit<User, 'password'>;

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<PublicUser> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<PublicUser> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: User,
  })
  @ApiBody({ type: UpdateUserDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<PublicUser> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'User deleted',
    schema: {
      example: { message: 'User deleted successfully', status: 200 },
    },
  })
  async remove(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<{ message: string; status: number }> {
    return this.usersService.remove(id);
  }
}

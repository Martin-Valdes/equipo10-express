import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const email = createUserDto.email.toUpperCase().trim();
      createUserDto.email.toUpperCase();
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exist');
      }

      const newUser = this.userRepository.create({
        ...createUserDto,
        email,
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('Error creating user:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al crear el usuario',
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();

      return users;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('Error creating user:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al crear el usuario',
      );
    }
  }

  async findOne(id: string) {
    try {
      const userById = await this.userRepository.findOne({
        where: { id },
      });
      if (!userById) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      return userById;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error(`Error buscando usuario ID ${id}:`, error);
      throw new InternalServerErrorException('Error al buscar el usuario');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      if (updateUserDto.email) {
        const email = updateUserDto.email.toUpperCase().trim();
        const existingUser = await this.userRepository.findOne({
          where: { email },
        });

        if (existingUser && existingUser.id !== id) {
          throw new ConflictException(
            'El nuevo email ya está registrado por otro usuario',
          );
        }

        updateUserDto.email = email;
      }

      const updatedUser = await this.userRepository.save({
        ...user,
        ...updateUserDto,
      });

      const { password, ...result } = updatedUser;
      return result;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      console.error(`Error actualizando usuario ID ${id}:`, error);
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async remove(id: string) {
    try {
      const userById = await this.userRepository.findOne({
        where: { id },
      });
      if (!userById) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      await this.userRepository.remove(userById);
      return { message: 'Eliminado correctamente', status: 200 };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error(`Error buscando usuario ID ${id}:`, error);
      throw new InternalServerErrorException('Error al buscar el usuario');
    }
  }
}

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
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

export const roundOfHashing = 10;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const email = createUserDto.email.toLowerCase().trim();
      createUserDto.email.toLowerCase();
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exist');
      }

      if (!createUserDto.password) {
        throw new ConflictException('Password is required');
      }
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        roundOfHashing
      );

      const newUser = this.userRepository.create({
        ...createUserDto,
        email,
        password: hashedPassword,
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('Error creating user:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al crear el usuario'
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
        'Ocurrió un error al crear el usuario'
      );
    }
  }


async findOrCreateGoogleUser(googleUser: { googleId: string, email: string, name: string }) {

  let user = await this.userRepository.findOne({ where: { googleId: googleUser.googleId } });

  if (user) return user;

  user = await this.userRepository.findOne({ where: { email: googleUser.email } });
  
  if (user) {
    user.googleId = googleUser.googleId;
    await this.userRepository.save(user);
    return user;
  }
Repository

  return this.userRepository.save({
    googleId: googleUser.googleId,
    email: googleUser.email,
    firstName: googleUser.name,
    lastName: googleUser.name,
    isVerified: true, 
  });
}

  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        return null; 
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error(`Error buscando usuario por email ${email}:`, error);
      throw new InternalServerErrorException(
        'Error al buscar el usuario por email'
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
            'El nuevo email ya está registrado por otro usuario'
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

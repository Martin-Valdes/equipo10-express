import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PaginationQueryDto } from '../../src/common/constants/dto/pagination-query.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto, userId: string) {
    const contact = this.contactRepository.create({
      ...createContactDto,
      owner: { id: userId },
    });
    return await this.contactRepository.save(contact);
  }

  async findAll(paginationQuery: PaginationQueryDto, userId: string) {
    const { limit, offset, search } = paginationQuery;
    
    const where: any = { owner: { id: userId } };
    
    if (search) {
      where.firstName = Like(`%${search}%`);
      where.lastName = Like(`%${search}%`);
      where.email = Like(`%${search}%`);
    }

    return await this.contactRepository.find({
      where,
      skip: offset,
      take: limit,
      order: { lastName: 'ASC', firstName: 'ASC' },
    });
  }

  async findOne(id: string, userId: string) {
    const contact = await this.contactRepository.findOne({
      where: { id, owner: { id: userId } },
    });
    
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto, userId: string) {
    const contact = await this.contactRepository.preload({
      id,
      ...updateContactDto,
      owner: { id: userId },
    });
    
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    
    return this.contactRepository.save(contact);
  }

  async remove(id: string, userId: string) {
    const contact = await this.findOne(id, userId);
    return this.contactRepository.remove(contact);
  }

  async toggleFavorite(id: string, userId: string) {
    const contact = await this.findOne(id, userId);
    contact.isFavorite = !contact.isFavorite;
    return this.contactRepository.save(contact);
  }
}
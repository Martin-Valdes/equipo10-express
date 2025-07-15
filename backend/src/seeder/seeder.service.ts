import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../client/entities/client.entity';
import { Repository } from 'typeorm';
import { clients } from './data/clients';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}
  async seed() {
    await this.clientRepository.save(clients);
  }
}

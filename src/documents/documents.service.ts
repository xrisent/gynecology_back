import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { join } from 'path';
import { unlink } from 'fs/promises';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto) {
    const document = this.documentRepository.create(createDocumentDto);
    return await this.documentRepository.save(document);
  }

  async findAll() {
    return await this.documentRepository.find();
  }

  async findOne(id: number) {
    return await this.documentRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const document = await this.documentRepository.findOne({ where: { id } });
  
    if (!document) {
      throw new Error('Document not found');
    }
  
    // Удаляем файл с диска
    const filePath = join(__dirname, '..', '..', document.file);
    await unlink(filePath).catch(() => {
      // если файла нет, не критично
    });
  
    // Удаляем запись из базы
    return await this.documentRepository.remove(document);
  }
}
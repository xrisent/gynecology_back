import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Thesis } from './entities/thesis.entity';
import { CreateThesisDto } from './dto/create-thesis.dto';
import { UpdateThesisDto } from './dto/update-thesis.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ThesisService {
  constructor(
    @InjectRepository(Thesis)
    private readonly thesisRepository: Repository<Thesis>,
    private readonly emailService: EmailService,
  ) {}

  async create(createThesisDto: CreateThesisDto) {
    const thesis = this.thesisRepository.create(createThesisDto);
    const savedThesis = await this.thesisRepository.save(thesis);
    
    try {
      await this.emailService.sendEmail(
        savedThesis.email,
        'Ваш тезис принят',
        `Уважаемый(ая) ${savedThesis.fullName}, ваш тезис принят. Спасибо за участие!`,
      );
    } catch (error) {
      console.error('Failed to send thesis confirmation email:', error);
    }
    
    return savedThesis;
}

  async findAll() {
    return await this.thesisRepository.find();
  }

  async findOne(id: number) {
    return await this.thesisRepository.findOne({ where: { id } });
  }

  async update(id: number, updateThesisDto: UpdateThesisDto) {
    await this.thesisRepository.update(id, updateThesisDto);
    return this.findOne(id);
  }
  

  async remove(id: number) {
    await this.thesisRepository.delete(id);
  }
}

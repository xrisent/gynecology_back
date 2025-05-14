import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './entities/partner.entity';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
    private readonly emailService: EmailService,
  ) {}

  async create(createPartnerDto: CreatePartnerDto) {
    const partner = this.partnerRepository.create(createPartnerDto);
    return await this.partnerRepository.save(partner);
  }

  async findAll() {
    return await this.partnerRepository.find();
  }

  async findOne(id: number) {
    return await this.partnerRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePartnerDto: UpdatePartnerDto) {
    await this.partnerRepository.update(id, updatePartnerDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.partnerRepository.delete(id);
  }

  async acceptPartner(id: number) {
    await this.partnerRepository.update(id, { isAccepted: true });

    const partner = await this.findOne(id);

    try {
      if (partner) {
        await this.emailService.sendEmail(
          partner.email,
          'Ваша заявка на партнерство принята',
          `Уважаемый(ая) ${partner.fullName}, ваша заявка на партнерство от компании "${partner.companyName}" была принята. Благодарим вас за сотрудничество!`,
        );
      }
    } catch (error) {
      console.error('Failed to send partner acceptance email:', error);
    }

    return partner;
  }
}

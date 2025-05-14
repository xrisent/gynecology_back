import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from './entities/receipt.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { Member } from 'src/member/entities/member.entity';
import { Partner } from 'src/partner/entities/partner.entity';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepository: Repository<Receipt>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

  async create(filePath: string, createReceiptDto: CreateReceiptDto) {
    console.log('DTO:', createReceiptDto);
    const { memberId, partnerId } = createReceiptDto;
    
    const receipt = this.receiptRepository.create({ file: filePath });
    
    if (memberId) {
      const member = await this.memberRepository.findOne({
        where: { id: memberId },
      });
      receipt.member = member || undefined;
    }
    
    if (partnerId) {
      const partner = await this.partnerRepository.findOne({
        where: { id: partnerId },
      });
      receipt.partner = partner || undefined;
    }
  
    return await this.receiptRepository.save(receipt);
  }

  async findAll() {
    return await this.receiptRepository.find({
      relations: ['member', 'partner'],  
    });
  }

  async findOne(id: number) {
    return await this.receiptRepository.findOne({
      where: { id },
      relations: ['member', 'partner'],
    });
  }

  async update(id: number, updateReceiptDto: UpdateReceiptDto) {
    await this.receiptRepository.update(id, updateReceiptDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.receiptRepository.delete(id);
  }
}
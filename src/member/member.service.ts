import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly emailService: EmailService,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const memberData = {
      ...createMemberDto,
      galaDinnerPrice: 5000,
      twoDayConferencePrice: 3000,
      hysteroscopyPrice: 4000,
    };

    const member = this.memberRepository.create(memberData);
    const savedMember = await this.memberRepository.save(member);

    return savedMember;
  }

  private calculateTotalCost(member: Member): number {
    let total = 0;
    if (member.isGalaDinner) total += member.galaDinnerPrice;
    if (member.isTwoDayConference) total += member.twoDayConferencePrice;
    if (member.isHysteroscopy) total += member.hysteroscopyPrice;
    return total;
  }

  private getSelectedConferences(member: Member): string {
    const conferences: string[] = [];
    if (member.isGalaDinner) conferences.push('Гала-ужин');
    if (member.isTwoDayConference) conferences.push('2 дня конференции');
    if (member.isHysteroscopy) conferences.push('Гистероскопия');
    return conferences.join(', ') || 'нет выбранных мероприятий';
  }

  async findAll() {
    return await this.memberRepository.find();
  }

  async findOne(id: number) {
    return await this.memberRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    await this.memberRepository.update(id, updateMemberDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.memberRepository.delete(id);
  }

  async acceptPartner(id: number) {
    await this.memberRepository.update(id, { isAccepted: true });

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

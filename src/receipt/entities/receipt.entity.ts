import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Member } from '../../member/entities/member.entity';
import { Partner } from '../../partner/entities/partner.entity';

@Entity('receipt')
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file: string;

  @ManyToOne(() => Member, (member) => member.receipts, { nullable: true })
  member?: Member;

  @ManyToOne(() => Partner, (partner) => partner.receipts, { nullable: true })
  partner?: Partner;
}

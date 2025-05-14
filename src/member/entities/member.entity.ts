import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Receipt } from '../../receipt/entities/receipt.entity';

@Entity('member')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  number: string;

  @Column()
  companyName: string;

  @Column({ default: false })
  isAccepted: boolean;

  @Column({ default: false })
  isGalaDinner: boolean;

  @Column({ default: 5000 })
  galaDinnerPrice: number;

  @Column({ default: false })
  isTwoDayConference: boolean;

  @Column({ default: 3000 })
  twoDayConferencePrice: number;

  @Column({ default: false })
  isHysteroscopy: boolean;

  @Column({ default: 4000 })
  hysteroscopyPrice: number;

  @OneToMany(() => Receipt, (receipt) => receipt.member)
  receipts: Receipt[];

  calculateTotalCost(): number {
    let total = 0;

    if (this.isGalaDinner) {
      total += this.galaDinnerPrice;
    }

    if (this.isTwoDayConference) {
      total += this.twoDayConferencePrice;
    }

    if (this.isHysteroscopy) {
      total += this.hysteroscopyPrice;
    }

    return total;
  }
}

import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Receipt } from '../../receipt/entities/receipt.entity';

@Entity('partner')
export class Partner {
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

  @OneToMany(() => Receipt, (receipt) => receipt.partner)
  receipts: Receipt[];

  @Column({ default: false })
  isAccepted: boolean;
}

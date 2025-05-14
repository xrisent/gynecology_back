import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('thesis')
export class Thesis {
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

  @Column()
  file: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  companyName: string;

  @Column()
  position: string;

  @Column()
  image: string;
}

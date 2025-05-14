import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { Receipt } from 'src/receipt/entities/receipt.entity';

export class CreatePartnerDto {
  @ApiProperty({ description: 'Full name of the partner' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'Email of the partner' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone number of the partner' })
  @IsNotEmpty()
  number: string;

  @ApiProperty({ description: 'Company name of the partner' })
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ type: [Receipt], description: 'List of receipts associated with the partner' })
  receipts: Receipt[];

  @ApiProperty({ description: 'Is partner accepted', type: Boolean, default: false })
  @IsBoolean()
  @IsOptional()
  isAccepted: boolean;
}
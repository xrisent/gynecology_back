import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Receipt } from 'src/receipt/entities/receipt.entity';

export class CreateMemberDto {
  @ApiProperty({ description: 'Full name of the member' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'Email of the member' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone number of the member' })
  @IsNotEmpty()
  number: string;

  @ApiProperty({ description: 'Company name of the member' })
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ description: 'Is partner accepted', type: Boolean, default: false })
  @IsBoolean()
  @IsOptional()
  isAccepted: boolean;

  @ApiProperty({ description: 'Include Gala Dinner', default: false })
  @IsBoolean()
  @IsOptional()
  isGalaDinner?: boolean;

  @ApiProperty({ description: 'Include 2-day Conference', default: false })
  @IsBoolean()
  @IsOptional()
  isTwoDayConference?: boolean;

  @ApiProperty({ description: 'Include Hysteroscopy Workshop', default: false })
  @IsBoolean()
  @IsOptional()
  isHysteroscopy?: boolean;

  @ApiProperty({ type: [Receipt], description: 'List of receipts associated with the member' })
  @IsOptional()
  receipts?: Receipt[];
}
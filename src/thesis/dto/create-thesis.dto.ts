import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateThesisDto {
  @ApiProperty({ description: 'Full name of the thesis author' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'Email of the thesis author' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone number of the thesis author' })
  @IsNotEmpty()
  number: string;

  @ApiProperty({ description: 'Company name of the thesis author' })
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ description: 'File associated with the thesis' })
  file: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateReceiptDto {
  @ApiProperty({ description: 'File name of the receipt' })
  file: string;

  @ApiProperty({ description: 'Member associated with the receipt', required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  memberId?: number;

  @ApiProperty({ description: 'Partner associated with the receipt', required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  partnerId?: number;
}

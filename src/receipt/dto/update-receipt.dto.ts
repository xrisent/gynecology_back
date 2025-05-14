import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReceiptDto } from './create-receipt.dto';  // Используем DTO для создания

export class UpdateReceiptDto extends PartialType(CreateReceiptDto) {
  @ApiProperty({ description: 'File name of the receipt', required: false })
  file?: string;

  @ApiProperty({ description: 'Member associated with the receipt', required: false })
  memberId?: number;

  @ApiProperty({ description: 'Partner associated with the receipt', required: false })
  partnerId?: number;
}

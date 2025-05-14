import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateThesisDto } from './create-thesis.dto';

export class UpdateThesisDto extends PartialType(CreateThesisDto) {
  @ApiProperty({ description: 'Full name of the thesis author', required: false })
  fullName?: string;

  @ApiProperty({ description: 'Email of the thesis author', required: false })
  email?: string;

  @ApiProperty({ description: 'Phone number of the thesis author', required: false })
  number?: string;

  @ApiProperty({ description: 'Company name of the thesis author', required: false })
  companyName?: string;

  @ApiProperty({ description: 'File associated with the thesis', required: false })
  file?: string;
}

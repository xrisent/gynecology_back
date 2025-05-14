import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Full name of the employee' })
  fullName: string;

  @ApiProperty({ description: 'Company name of the employee' })
  companyName: string;

  @ApiProperty({ description: 'Position (job title) of the employee' })
  position: string;

  @ApiProperty({ description: 'Image URL of the employee' })
  image: string;
}

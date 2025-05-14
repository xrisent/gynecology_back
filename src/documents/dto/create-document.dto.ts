import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ description: 'Name of the document' })
  name: string;

  @ApiProperty({ description: 'File path of the uploaded document' })
  file: string;
}
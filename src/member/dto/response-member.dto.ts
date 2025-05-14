import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../entities/member.entity';

export class ResponseMemberDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  isAccepted: boolean

  @ApiProperty()
  isGalaDinner: boolean;

  @ApiProperty()
  isTwoDayConference: boolean;

  @ApiProperty()
  isHysteroscopy: boolean;

  @ApiProperty()
  totalCost: number;

  static fromMember(member: Member): ResponseMemberDto {
    const dto = new ResponseMemberDto();
    dto.id = member.id;
    dto.fullName = member.fullName;
    dto.email = member.email;
    dto.number = member.number;
    dto.companyName = member.companyName;
    dto.isGalaDinner = member.isGalaDinner;
    dto.isTwoDayConference = member.isTwoDayConference;
    dto.isHysteroscopy = member.isHysteroscopy;
    dto.totalCost = member.calculateTotalCost();
    return dto;
  }
}
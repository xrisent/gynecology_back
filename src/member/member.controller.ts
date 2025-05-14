import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResponseMemberDto } from './dto/response-member.dto';

@ApiTags('members')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  @ApiResponse({
    status: 201,
    description: 'The member has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all members' })
  @ApiResponse({
    status: 200,
    description: 'List of all members with total cost',
    type: [ResponseMemberDto],
  })
  async findAll() {
    const members = await this.memberService.findAll();
    return members.map((member) => ResponseMemberDto.fromMember(member));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get a member by ID' })
  @ApiResponse({
    status: 200,
    description: 'The member found with total cost',
    type: ResponseMemberDto,
  })
  async findOne(@Param('id') id: string) {
    const member = await this.memberService.findOne(+id);

    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }

    return ResponseMemberDto.fromMember(member);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Partially update a member by ID' })
  @ApiResponse({
    status: 200,
    description: 'The member has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Member not found.' })
  updatePartial(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Remove a member by ID' })
  @ApiResponse({
    status: 200,
    description: 'The member has been successfully removed.',
  })
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }

  @Post(':id/accept')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  acceptPartner(@Param('id') id: string) {
    return this.memberService.acceptPartner(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ThesisService } from './thesis.service';
import { CreateThesisDto } from './dto/create-thesis.dto';
import { UpdateThesisDto } from './dto/update-thesis.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('thesis')
export class ThesisController {
  constructor(private readonly thesisService: ThesisService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload thesis with file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Thesis file to upload',
        },
        fullName: {
          type: 'string',
          description: 'Full name of the thesis author',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Email of the thesis author',
        },
        number: {
          type: 'string',
          description: 'Phone number of the thesis author',
        },
        companyName: {
          type: 'string',
          description: 'Company name of the thesis author',
        },
      },
      required: ['file', 'fullName', 'email', 'number', 'companyName'],
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/theses',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createThesisDto: Omit<CreateThesisDto, 'file'>,
  ) {
    const newThesis = {
      ...createThesisDto,
      file: `/uploads/theses/${file.filename}`,
    };
    return this.thesisService.create(newThesis);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  findAll() {
    return this.thesisService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  findOne(@Param('id') id: string) {
    return this.thesisService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async update(
    @Param('id') id: string,
    @Body() updateThesisDto: UpdateThesisDto,
  ) {
    return this.thesisService.update(+id, updateThesisDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  remove(@Param('id') id: string) {
    return this.thesisService.remove(+id);
  }
}

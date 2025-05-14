import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { Partner } from './entities/partner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Partner]), EmailModule],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports: [TypeOrmModule]
})
export class PartnerModule {}

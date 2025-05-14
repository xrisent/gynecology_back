import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { Receipt } from './entities/receipt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from 'src/member/member.module';
import { PartnerModule } from 'src/partner/partner.module';
import { Partner } from 'src/partner/entities/partner.entity';
import { Member } from 'src/member/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt, Member, Partner]),
  MemberModule,
  PartnerModule
],
  controllers: [ReceiptController],
  providers: [ReceiptService],
})
export class ReceiptModule {}

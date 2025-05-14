import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member/entities/member.entity';
import { Partner } from './partner/entities/partner.entity';
import { Employee } from './employee/entities/employee.entity';
import { Receipt } from './receipt/entities/receipt.entity';
import { Thesis } from './thesis/entities/thesis.entity';
import { Document } from './documents/entities/document.entity';
import { MemberModule } from './member/member.module';
import { PartnerModule } from './partner/partner.module';
import { EmployeeModule } from './employee/employee.module';
import { ThesisModule } from './thesis/thesis.module';
import { ReceiptModule } from './receipt/receipt.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { DocumentsModule } from './documents/documents.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { EmailModule } from './email/email.module';
import * as dotenv from 'dotenv';
dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '1234',
      database: process.env.DB_NAME || 'onkology',
      entities: [User, Member, Partner, Employee, Receipt, Thesis, Document],
      autoLoadEntities: true,
      synchronize: true,
    }),
    MemberModule,
    PartnerModule,
    EmployeeModule,
    ThesisModule,
    ReceiptModule,
    MulterModule.register({ dest: './uploads' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UsersModule,
    AuthModule,
    DocumentsModule,
    EmailModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly authService: AuthService) {}

  async onApplicationBootstrap() {
    await this.authService.createInitialUser();
  }
}
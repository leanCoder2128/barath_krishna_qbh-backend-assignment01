import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './userDetail/userDetail.module';
import { ConfigModule } from '@nestjs/config';
import { UserDetail } from './userDetail/userDetail.entity';
import { GeneratePdfModule } from './generatePdf/generatePdf.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    GeneratePdfModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'qbhsa01',
      password: 'sa',
      database: 'qbhAssignment01DB',
      entities: [UserDetail ],
      synchronize: true,
      logging: false,
      options: {
        trustServerCertificate: true,
        encrypt: false,
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

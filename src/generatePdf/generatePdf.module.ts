import { Module } from '@nestjs/common';
import { GeneratePdfController } from './generatePdf.controller';
import { GeneratePdfService } from './generatePdf.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetail } from 'src/userDetail/userDetail.entity';

@Module({
    imports : [TypeOrmModule.forFeature([UserDetail])],
  controllers: [GeneratePdfController],
  providers: [GeneratePdfService],
})
export class GeneratePdfModule {}

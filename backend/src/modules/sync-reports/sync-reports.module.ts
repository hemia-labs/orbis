import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncReport } from './entities/sync-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SyncReport])],
  exports: [TypeOrmModule],
})
export class SyncReportsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MergeRequest } from './entities/merge-request.entity';
import { MergeConflict } from './entities/merge-conflict.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MergeRequest, MergeConflict])],
  exports: [TypeOrmModule],
})
export class MergeRequestsModule {}

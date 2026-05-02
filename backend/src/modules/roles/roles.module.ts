import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { DatabaseModule } from '@/database/database.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Role]), PermissionsModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}

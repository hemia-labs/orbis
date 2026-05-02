import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMember } from './entities/project-member.entity';
import { Project } from './entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectMember])],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}

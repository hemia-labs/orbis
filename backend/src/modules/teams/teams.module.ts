import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMembership } from './entities/team-membership.entity';
import { Team } from './entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamMembership])],
  exports: [TypeOrmModule],
})
export class TeamsModule {}

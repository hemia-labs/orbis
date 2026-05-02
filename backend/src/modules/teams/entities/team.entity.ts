import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { TeamMembership } from './team-membership.entity';

@Entity('teams')
@Index('teams_organization_id_idx', ['organization'])
@Index('teams_status_idx', ['status'])
@Index('teams_organization_slug_unique_active', ['organization', 'slug'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', default: 'active' })
  status: 'active' | 'archived' | 'disabled';

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @OneToMany(() => TeamMembership, (membership) => membership.team)
  memberships: TeamMembership[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default Team;

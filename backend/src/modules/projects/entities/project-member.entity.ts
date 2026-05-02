import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Check,
} from 'typeorm';
import { Membership } from '../../memberships/entities/membership.entity';
import { Role } from '../../roles/entities/role.entity';
import { Team } from '../../teams/entities/team.entity';
import { Project } from './project.entity';

@Entity('project_members')
@Index('project_members_project_id_idx', ['project'])
@Index('project_members_membership_id_idx', ['membership'])
@Index('project_members_team_id_idx', ['team'])
@Index('project_members_role_id_idx', ['role'])
@Index('project_members_member_type_idx', ['memberType'])
@Index('project_members_status_idx', ['status'])
@Index(
  'project_members_project_membership_unique_active',
  ['project', 'membership'],
  {
    unique: true,
    where: 'membership_id IS NOT NULL AND deleted_at IS NULL',
  },
)
@Index('project_members_project_team_unique_active', ['project', 'team'], {
  unique: true,
  where: 'team_id IS NOT NULL AND deleted_at IS NULL',
})
@Check(
  'project_members_exactly_one_member',
  `(("membership_id" IS NOT NULL AND "team_id" IS NULL AND "member_type" = 'user') OR ("membership_id" IS NULL AND "team_id" IS NOT NULL AND "member_type" = 'team'))`,
)
export class ProjectMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Membership, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'membership_id' })
  membership: Membership | null;

  @ManyToOne(() => Team, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'team_id' })
  team: Team | null;

  @ManyToOne(() => Role, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role | null;

  @Column({ name: 'member_type', type: 'varchar' })
  memberType: 'user' | 'team';

  @Column({ type: 'varchar', default: 'active' })
  status: 'active' | 'removed' | 'suspended';

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default ProjectMember;

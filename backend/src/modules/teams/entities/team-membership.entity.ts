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
} from 'typeorm';
import { Membership } from '../../memberships/entities/membership.entity';
import { Role } from '../../roles/entities/role.entity';
import { Team } from './team.entity';

@Entity('team_memberships')
@Index('team_memberships_team_id_idx', ['team'])
@Index('team_memberships_membership_id_idx', ['membership'])
@Index('team_memberships_role_id_idx', ['role'])
@Index('team_memberships_status_idx', ['status'])
@Index(
  'team_memberships_team_membership_unique_active',
  ['team', 'membership'],
  {
    unique: true,
    where: 'deleted_at IS NULL',
  },
)
export class TeamMembership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Team, (team) => team.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => Membership, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'membership_id' })
  membership: Membership;

  @ManyToOne(() => Role, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role | null;

  @Column({ type: 'varchar', default: 'active' })
  status: 'active' | 'invited' | 'suspended' | 'removed';

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @Column({ name: 'joined_at', type: 'timestamptz', nullable: true })
  joinedAt: Date | null;

  @Column({ name: 'removed_at', type: 'timestamptz', nullable: true })
  removedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default TeamMembership;

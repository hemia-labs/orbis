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
import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('memberships')
@Index(
  'memberships_organization_user_unique_active',
  ['organization', 'user'],
  {
    unique: true,
    where: 'deleted_at IS NULL',
  },
)
@Index('memberships_organization_id_idx', ['organization'])
@Index('memberships_user_id_idx', ['user'])
@Index('memberships_role_id_idx', ['role'])
@Index('memberships_status_idx', ['status'])
export class Membership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @ManyToOne(() => User, (user) => user.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ type: 'varchar', default: 'active' })
  status: 'active' | 'invited' | 'suspended' | 'removed';

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'invited_by' })
  invitedBy: User | null;

  @Column({ name: 'invited_at', type: 'timestamptz', nullable: true })
  invitedAt: Date | null;

  @Column({ name: 'joined_at', type: 'timestamptz', nullable: true })
  joinedAt: Date | null;

  @Column({ name: 'suspended_at', type: 'timestamptz', nullable: true })
  suspendedAt: Date | null;

  @Column({ name: 'removed_at', type: 'timestamptz', nullable: true })
  removedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default Membership;

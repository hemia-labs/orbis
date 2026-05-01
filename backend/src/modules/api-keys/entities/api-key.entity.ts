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

@Entity('api_keys')
@Index('api_keys_key_hash_unique_active', ['keyHash'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
@Index('api_keys_organization_id_idx', ['organization'])
@Index('api_keys_user_id_idx', ['user'])
@Index('api_keys_role_id_idx', ['role'])
@Index('api_keys_status_idx', ['status'])
@Index('api_keys_prefix_idx', ['prefix'])
@Index('api_keys_created_by_idx', ['createdBy'])
@Index('api_keys_last_used_at_idx', ['lastUsedAt'])
export class ApiKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @ManyToOne(() => Role, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role | null;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  prefix: string;

  @Column({ name: 'key_hash', type: 'text' })
  keyHash: string;

  @Column({ type: 'jsonb', default: [] })
  scopes: string[];

  @Column({ type: 'varchar', default: 'active' })
  status: 'active' | 'revoked' | 'expired' | 'disabled';

  @Column({ name: 'last_used_at', type: 'timestamptz', nullable: true })
  lastUsedAt: Date | null;

  @Column({ name: 'last_used_ip', type: 'inet', nullable: true })
  lastUsedIp: string | null;

  @Column({ name: 'last_used_user_agent', type: 'text', nullable: true })
  lastUsedUserAgent: string | null;

  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt: Date | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy: User | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  revokedAt: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;
}

export default ApiKey;

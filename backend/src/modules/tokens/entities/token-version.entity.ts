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
import { Project } from '../../projects/entities/project.entity';
import { Environment } from '../../environments/entities/environment.entity';
import { TokenSnapshot } from './token-snapshot.entity';
import { User } from '../../users/entities/user.entity';

@Entity('token_versions')
@Index('token_versions_environment_version_unique_active', ['environment', 'version'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
@Index('token_versions_snapshot_unique_active', ['snapshot'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
@Index('token_versions_project_id_idx', ['project'])
@Index('token_versions_environment_id_idx', ['environment'])
@Index('token_versions_snapshot_id_idx', ['snapshot'])
@Index('token_versions_status_idx', ['status'])
@Index('token_versions_published_by_idx', ['publishedBy'])
@Index('token_versions_published_at_idx', ['publishedAt'])
export class TokenVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Environment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'environment_id' })
  environment: Environment;

  @ManyToOne(() => TokenSnapshot, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'snapshot_id' })
  snapshot: TokenSnapshot;

  @Column({ type: 'text' })
  version: string;

  @Column({ type: 'text', nullable: true })
  name: string | null;

  @Column({ type: 'text', nullable: true })
  changelog: string | null;

  @Column({ type: 'varchar', default: 'published' })
  status: 'draft' | 'published' | 'deprecated' | 'rolled_back';

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'published_by' })
  publishedBy: User | null;

  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  publishedAt: Date | null;

  @Column({ name: 'deprecated_at', type: 'timestamptz', nullable: true })
  deprecatedAt: Date | null;

  @Column({ name: 'rolled_back_at', type: 'timestamptz', nullable: true })
  rolledBackAt: Date | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default TokenVersion;

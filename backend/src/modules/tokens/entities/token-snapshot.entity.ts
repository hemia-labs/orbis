import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Environment } from '../../environments/entities/environment.entity';
import { User } from '../../users/entities/user.entity';

@Entity('token_snapshots')
@Index('token_snapshots_environment_version_unique_active', ['environment', 'version'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
@Index('token_snapshots_project_id_idx', ['project'])
@Index('token_snapshots_environment_id_idx', ['environment'])
@Index('token_snapshots_version_idx', ['version'])
@Index('token_snapshots_status_idx', ['status'])
@Index('token_snapshots_created_by_idx', ['createdBy'])
export class TokenSnapshot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Environment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'environment_id' })
  environment: Environment;

  @Column({ type: 'text' })
  version: string;

  @Column({ type: 'varchar', default: 'json' })
  format: 'json' | 'css' | 'scss' | 'tailwind' | 'typescript' | 'flutter' | 'android' | 'ios' | 'figma' | 'multi';

  @Column({ name: 'storage_url', type: 'text' })
  storageUrl: string;

  @Column({ type: 'text' })
  checksum: string;

  @Column({ type: 'varchar', default: 'created' })
  status: 'created' | 'published' | 'deprecated' | 'failed';

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy: User | null;

  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  publishedAt: Date | null;

  @Column({ name: 'deprecated_at', type: 'timestamptz', nullable: true })
  deprecatedAt: Date | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default TokenSnapshot;

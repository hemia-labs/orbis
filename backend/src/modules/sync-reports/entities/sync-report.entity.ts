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
import { App } from '../../apps/entities/app.entity';
import { Project } from '../../projects/entities/project.entity';
import { Environment } from '../../environments/entities/environment.entity';
import { User } from '../../users/entities/user.entity';
import { ApiKey } from '../../api-keys/entities/api-key.entity';

@Entity('sync_reports')
@Index('sync_reports_app_id_idx', ['app'])
@Index('sync_reports_project_id_idx', ['project'])
@Index('sync_reports_environment_id_idx', ['environment'])
@Index('sync_reports_status_idx', ['status'])
@Index('sync_reports_trigger_source_idx', ['triggerSource'])
@Index('sync_reports_triggered_by_idx', ['triggeredBy'])
@Index('sync_reports_api_key_id_idx', ['apiKey'])
@Index('sync_reports_created_at_idx', ['createdAt'])
export class SyncReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => App, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'app_id' })
  app: App | null;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Environment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'environment_id' })
  environment: Environment;

  @Column({ type: 'text', nullable: true })
  version: string | null;

  @Column({ name: 'cli_version', type: 'text', nullable: true })
  cliVersion: string | null;

  @Column({ type: 'varchar', default: 'pending' })
  status: 'pending' | 'running' | 'success' | 'failed' | 'cancelled';

  @Column({ name: 'trigger_source', type: 'varchar', default: 'cli' })
  triggerSource: 'cli' | 'api' | 'dashboard' | 'webhook' | 'system';

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'triggered_by' })
  triggeredBy: User | null;

  @ManyToOne(() => ApiKey, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'api_key_id' })
  apiKey: ApiKey | null;

  @Column({ name: 'tokens_synced', type: 'integer', default: 0 })
  tokensSynced: number;

  @Column({ name: 'files_written', type: 'integer', default: 0 })
  filesWritten: number;

  @Column({ name: 'duration_ms', type: 'integer', nullable: true })
  durationMs: number | null;

  @Column({ name: 'error_code', type: 'text', nullable: true })
  errorCode: string | null;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @Column({ name: 'started_at', type: 'timestamptz', nullable: true })
  startedAt: Date | null;

  @Column({ name: 'finished_at', type: 'timestamptz', nullable: true })
  finishedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default SyncReport;

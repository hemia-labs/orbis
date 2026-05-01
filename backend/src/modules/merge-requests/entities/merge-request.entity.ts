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
import { User } from '../../users/entities/user.entity';

@Entity('merge_requests')
@Index('merge_requests_open_unique_active', ['project', 'sourceEnvironment', 'targetEnvironment'], {
  unique: true,
  where: "status IN ('open', 'draft', 'conflict') AND deleted_at IS NULL",
})
@Index('merge_requests_project_id_idx', ['project'])
@Index('merge_requests_source_environment_id_idx', ['sourceEnvironment'])
@Index('merge_requests_target_environment_id_idx', ['targetEnvironment'])
@Index('merge_requests_status_idx', ['status'])
@Index('merge_requests_review_status_idx', ['reviewStatus'])
@Index('merge_requests_created_by_idx', ['createdBy'])
@Index('merge_requests_merged_by_idx', ['mergedBy'])
@Index('merge_requests_created_at_idx', ['createdAt'])
export class MergeRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Environment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'source_environment_id' })
  sourceEnvironment: Environment;

  @ManyToOne(() => Environment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'target_environment_id' })
  targetEnvironment: Environment;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', default: 'open' })
  status: 'open' | 'merged' | 'closed' | 'conflict' | 'draft';

  @Column({ name: 'review_status', type: 'varchar', default: 'pending' })
  reviewStatus: 'pending' | 'approved' | 'changes_requested' | 'skipped';

  @Column({ type: 'text', nullable: true })
  changelog: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy: User | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'merged_by' })
  mergedBy: User | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'closed_by' })
  closedBy: User | null;

  @Column({ name: 'source_version', type: 'text', nullable: true })
  sourceVersion: string | null;

  @Column({ name: 'target_version', type: 'text', nullable: true })
  targetVersion: string | null;

  @Column({ type: 'jsonb', default: {} })
  checks: Record<string, unknown>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'merged_at', type: 'timestamptz', nullable: true })
  mergedAt: Date | null;

  @Column({ name: 'closed_at', type: 'timestamptz', nullable: true })
  closedAt: Date | null;

  @Column({ name: 'conflict_at', type: 'timestamptz', nullable: true })
  conflictAt: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default MergeRequest;

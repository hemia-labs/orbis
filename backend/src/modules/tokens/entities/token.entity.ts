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

@Entity('tokens')
@Index('tokens_environment_path_unique_active', ['environment', 'path'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
@Index('tokens_project_id_idx', ['project'])
@Index('tokens_environment_id_idx', ['environment'])
@Index('tokens_type_idx', ['type'])
@Index('tokens_token_kind_idx', ['tokenKind'])
@Index('tokens_status_idx', ['status'])
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Environment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'environment_id' })
  environment: Environment;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  path: string;

  @Column({ type: 'varchar' })
  type: 'color' | 'dimension' | 'font-family' | 'font-size' | 'font-weight' | 'line-height' | 'letter-spacing' | 'spacing' | 'sizing' | 'border-radius' | 'border-width' | 'border-color' | 'shadow' | 'opacity' | 'duration' | 'easing' | 'z-index' | 'asset' | 'gradient' | 'typography' | 'other';

  @Column({ name: 'token_kind', type: 'varchar' })
  tokenKind: 'primitive' | 'semantic' | 'component';

  @Column({ type: 'jsonb' })
  value: Record<string, unknown>;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', default: 'active' })
  status: 'active' | 'deprecated' | 'draft' | 'archived';

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @Column({ name: 'deprecated_at', type: 'timestamptz', nullable: true })
  deprecatedAt: Date | null;

  @Column({ name: 'archived_at', type: 'timestamptz', nullable: true })
  archivedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default Token;

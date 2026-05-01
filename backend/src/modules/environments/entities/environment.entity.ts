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

@Entity('environments')
@Index('environments_project_slug_unique_active', ['project', 'slug'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
@Index('environments_one_production_per_project', ['project'], {
  unique: true,
  where: 'is_production = true AND deleted_at IS NULL',
})
@Index('environments_project_id_idx', ['project'])
@Index('environments_type_idx', ['type'])
@Index('environments_is_production_idx', ['isProduction'])
export class Environment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', default: 'development' })
  type: 'development' | 'staging' | 'production' | 'preview' | 'custom';

  @Column({ name: 'is_production', type: 'boolean', default: false })
  isProduction: boolean;

  @Column({ name: 'base_version', type: 'text', nullable: true })
  baseVersion: string | null;

  @Column({ name: 'latest_version', type: 'text', nullable: true })
  latestVersion: string | null;

  @Column({ type: 'jsonb', default: {} })
  settings: Record<string, unknown>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default Environment;

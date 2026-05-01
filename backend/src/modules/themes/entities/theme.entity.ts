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

@Entity('themes')
@Index('themes_environment_slug_unique_active', ['environment', 'slug'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
@Index('themes_one_default_per_environment', ['environment'], {
  unique: true,
  where: 'is_default = true AND deleted_at IS NULL',
})
@Index('themes_project_id_idx', ['project'])
@Index('themes_environment_id_idx', ['environment'])
@Index('themes_extends_theme_id_idx', ['extendsTheme'])
@Index('themes_status_idx', ['status'])
export class Theme {
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
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToOne(() => Theme, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'extends_theme_id' })
  extendsTheme: Theme | null;

  @Column({ name: 'is_default', type: 'boolean', default: false })
  isDefault: boolean;

  @Column({ type: 'varchar', default: 'active' })
  status: 'active' | 'draft' | 'archived' | 'disabled';

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @Column({ name: 'archived_at', type: 'timestamptz', nullable: true })
  archivedAt: Date | null;

  @Column({ name: 'disabled_at', type: 'timestamptz', nullable: true })
  disabledAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default Theme;

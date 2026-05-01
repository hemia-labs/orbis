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
import { Project } from '../../projects/entities/project.entity';
import { Environment } from '../../environments/entities/environment.entity';

@Entity('apps')
@Index('apps_project_environment_slug_unique_active', ['project', 'environment', 'slug'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
@Index('apps_organization_id_idx', ['organization'])
@Index('apps_project_id_idx', ['project'])
@Index('apps_environment_id_idx', ['environment'])
@Index('apps_platform_idx', ['platform'])
@Index('apps_framework_idx', ['framework'])
@Index('apps_status_idx', ['status'])
@Index('apps_sync_status_idx', ['syncStatus'])
export class App {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Environment, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'environment_id' })
  environment: Environment | null;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar' })
  platform: 'web' | 'mobile' | 'desktop' | 'backend' | 'design' | 'docs' | 'other';

  @Column({ type: 'varchar' })
  framework: 'vue' | 'react' | 'next' | 'nuxt' | 'svelte' | 'angular' | 'flutter' | 'ios' | 'android' | 'react-native' | 'electron' | 'tailwind' | 'css' | 'typescript' | 'figma' | 'other';

  @Column({ name: 'repo_url', type: 'text', nullable: true })
  repoUrl: string | null;

  @Column({ name: 'current_version', type: 'text', nullable: true })
  currentVersion: string | null;

  @Column({ type: 'varchar', default: 'active' })
  status: 'active' | 'paused' | 'archived' | 'disabled';

  @Column({ name: 'sync_status', type: 'varchar', default: 'never_synced' })
  syncStatus: 'never_synced' | 'synced' | 'pending' | 'failed' | 'outdated';

  @Column({ name: 'last_sync_at', type: 'timestamptz', nullable: true })
  lastSyncAt: Date | null;

  @Column({ type: 'jsonb', default: {} })
  settings: Record<string, unknown>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @Column({ name: 'paused_at', type: 'timestamptz', nullable: true })
  pausedAt: Date | null;

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

export default App;

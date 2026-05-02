import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  Index,
} from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('roles')
@Index('roles_organization_slug_unique_active', ['organization', 'slug'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
@Index('roles_system_slug_unique_active', ['slug'], {
  unique: true,
  where: 'organization_id IS NULL AND deleted_at IS NULL',
})
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_id', type: 'uuid', nullable: true })
  organizationId: string | null;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization | null;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', default: 'organization' })
  scope: 'system' | 'organization' | 'project' | 'team' | 'user' | string;

  @Column({ type: 'integer', default: 100 })
  level: number;

  @Column({ name: 'is_system', type: 'boolean', default: false })
  isSystem: boolean;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default Role;

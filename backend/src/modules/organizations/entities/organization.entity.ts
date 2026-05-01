import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

@Entity('organizations')
@Index('organizations_slug_unique_active', ['slug'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  slug: string;

  @Column({ name: 'billing_email', type: 'text', nullable: true })
  billingEmail: string | null;

  @Column({ type: 'varchar', default: 'free' })
  plan: 'free' | 'starter' | 'pro' | 'business' | 'enterprise';

  @Column({ type: 'varchar', default: 'active' })
  status: 'active' | 'pending' | 'suspended' | 'disabled';

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @Column({ name: 'suspended_at', type: 'timestamptz', nullable: true })
  suspendedAt: Date | null;

  @Column({ name: 'disabled_at', type: 'timestamptz', nullable: true })
  disabledAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default Organization;

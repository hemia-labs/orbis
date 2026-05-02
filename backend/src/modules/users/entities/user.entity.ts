import RefreshToken from '@/modules/auth/entities/refresh-token.entity';
import Membership from '@/modules/memberships/entities/membership.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity('users')
@Index('users_email_unique_active', ['email'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text', nullable: true })
  name: string | null;

  @Column({ type: 'text', nullable: true })
  lastname: string | null;

  @Column({ name: 'password_hash', type: 'text', nullable: true })
  passwordHash: string | null;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl: string | null;

  @Column({ type: 'varchar', default: 'pending' })
  status: 'active' | 'pending' | 'suspended' | 'disabled';

  @Column({ name: 'email_verified_at', type: 'timestamptz', nullable: true })
  emailVerifiedAt: Date | null;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt: Date | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];
}

export default User;

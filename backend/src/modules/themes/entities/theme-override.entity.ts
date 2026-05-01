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
import { Theme } from './theme.entity';
import { Token } from '../../tokens/entities/token.entity';

@Entity('theme_overrides')
@Index('theme_overrides_theme_token_unique_active', ['theme', 'token'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
@Index('theme_overrides_theme_id_idx', ['theme'])
@Index('theme_overrides_token_id_idx', ['token'])
export class ThemeOverride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Theme, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'theme_id' })
  theme: Theme;

  @ManyToOne(() => Token, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'token_id' })
  token: Token;

  @Column({ type: 'jsonb' })
  value: Record<string, unknown>;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default ThemeOverride;

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
import { MergeRequest } from './merge-request.entity';
import { Token } from '../../tokens/entities/token.entity';
import { User } from '../../users/entities/user.entity';

@Entity('merge_conflicts')
@Index('merge_conflicts_request_token_path_unique_active', ['mergeRequest', 'tokenPath'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
@Index('merge_conflicts_merge_request_id_idx', ['mergeRequest'])
@Index('merge_conflicts_token_id_idx', ['token'])
@Index('merge_conflicts_token_path_idx', ['tokenPath'])
@Index('merge_conflicts_status_idx', ['status'])
@Index('merge_conflicts_conflict_type_idx', ['conflictType'])
@Index('merge_conflicts_resolved_by_idx', ['resolvedBy'])
export class MergeConflict {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MergeRequest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'merge_request_id' })
  mergeRequest: MergeRequest;

  @ManyToOne(() => Token, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'token_id' })
  token: Token | null;

  @Column({ name: 'token_path', type: 'text' })
  tokenPath: string;

  @Column({ name: 'conflict_type', type: 'varchar', default: 'value_mismatch' })
  conflictType: 'value_mismatch' | 'type_mismatch' | 'deleted_in_source' | 'deleted_in_target' | 'reference_conflict' | 'theme_override_conflict' | 'metadata_conflict';

  @Column({ name: 'source_value', type: 'jsonb', nullable: true })
  sourceValue: Record<string, unknown> | null;

  @Column({ name: 'target_value', type: 'jsonb', nullable: true })
  targetValue: Record<string, unknown> | null;

  @Column({ name: 'resolved_value', type: 'jsonb', nullable: true })
  resolvedValue: Record<string, unknown> | null;

  @Column({ type: 'varchar', default: 'open' })
  status: 'open' | 'resolved' | 'ignored';

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'resolved_by' })
  resolvedBy: User | null;

  @Column({ name: 'resolved_at', type: 'timestamptz', nullable: true })
  resolvedAt: Date | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default MergeConflict;

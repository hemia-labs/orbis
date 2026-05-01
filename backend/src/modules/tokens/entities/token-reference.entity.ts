import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Token } from './token.entity';

@Entity('token_references')
@Index('token_references_unique_active', ['token', 'referencedToken'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
@Index('token_references_token_id_idx', ['token'])
@Index('token_references_referenced_token_id_idx', ['referencedToken'])
export class TokenReference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Token, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'token_id' })
  token: Token;

  @ManyToOne(() => Token, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'referenced_token_id' })
  referencedToken: Token;

  @Column({ name: 'reference_path', type: 'text', nullable: true })
  referencePath: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}

export default TokenReference;

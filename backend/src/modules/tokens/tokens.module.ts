import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokenReference } from './entities/token-reference.entity';
import { TokenSnapshot } from './entities/token-snapshot.entity';
import { TokenVersion } from './entities/token-version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token, TokenReference, TokenSnapshot, TokenVersion])],
  exports: [TypeOrmModule],
})
export class TokensModule {}

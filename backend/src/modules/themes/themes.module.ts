import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';
import { ThemeOverride } from './entities/theme-override.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theme, ThemeOverride])],
  exports: [TypeOrmModule],
})
export class ThemesModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres' as const,
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [
            path.join(__dirname, '..', '**', '*.entity.ts'),
            path.join(__dirname, '..', '**', '*.entity.js'),
          ],
          synchronize: false,
          logging: configService.get<boolean>('DB_LOGGING', true),
          extra: {
            options: '-c timezone=America/Mexico_City',
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envVarsSchema } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { SyncReportsModule } from './modules/sync-reports/sync-reports.module';
import { MembershipsModule } from './modules/memberships/memberships.module';
import { MergeRequestsModule } from './modules/merge-requests/merge-requests.module';
import { EnvironmentsModule } from './modules/environments/environments.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { AppsModule } from './modules/apps/apps.module';
import { ThemesModule } from './modules/themes/themes.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { UsersModule } from './modules/users/users.module';
import { TeamsModule } from './modules/teams/teams.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      validationSchema: envVarsSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    DatabaseModule,
    ApiKeysModule,
    AppsModule,
    OrganizationsModule,
    PermissionsModule,
    RolesModule,
    SyncReportsModule,
    EnvironmentsModule,
    MembershipsModule,
    MergeRequestsModule,
    ProjectsModule,
    ThemesModule,
    TokensModule,
    UsersModule,
    TeamsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

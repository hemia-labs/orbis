import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashPassword } from '../../common/utils/hash.util';

type SeedPermission = {
  slug: string;
  description: string;
};

type SeedRole = {
  slug: string;
  name: string;
  description: string;
  scope: string;
  level: number;
  isSystem: boolean;
  permissions: string[];
};

const superAdminOrganization = {
  slug: 'orbis',
  name: 'Orbis',
};

const permissions: SeedPermission[] = [
  {
    slug: '*',
    description: 'Acceso total al sistema dentro de la organizacion',
  },
  { slug: 'organization:read', description: 'Ver datos de la organizacion' },
  {
    slug: 'organization:update',
    description: 'Editar datos de la organizacion',
  },
  { slug: 'users:*', description: 'Gestion completa de usuarios y miembros' },
  { slug: 'users:invite', description: 'Invitar miembros' },
  { slug: 'users:manage', description: 'Cambiar roles o remover miembros' },
  { slug: 'api-keys:*', description: 'Gestion completa de API keys' },
  { slug: 'api-keys:read', description: 'Leer API keys' },
  { slug: 'api-keys:create', description: 'Crear API keys' },
  { slug: 'api-keys:revoke', description: 'Revocar API keys' },
  { slug: 'projects:*', description: 'Gestion completa de proyectos' },
  { slug: 'projects:read', description: 'Leer proyectos' },
  { slug: 'projects:create', description: 'Crear proyectos de tokens' },
  { slug: 'projects:update', description: 'Editar proyectos' },
  { slug: 'projects:delete', description: 'Eliminar proyectos' },
  {
    slug: 'project-members:*',
    description: 'Gestion completa de miembros de proyecto',
  },
  {
    slug: 'project-members:read',
    description: 'Leer miembros asignados a un proyecto',
  },
  {
    slug: 'project-members:manage',
    description: 'Agregar, actualizar o remover miembros de proyecto',
  },
  { slug: 'apps:*', description: 'Gestion completa de apps consumidoras' },
  { slug: 'apps:read', description: 'Leer apps consumidoras' },
  { slug: 'apps:manage', description: 'Crear y actualizar apps consumidoras' },
  { slug: 'tokens:*', description: 'Gestion completa de tokens' },
  { slug: 'tokens:read', description: 'Leer tokens' },
  { slug: 'tokens:push', description: 'Subir tokens locales al SaaS' },
  {
    slug: 'tokens:development:write',
    description: 'Crear y modificar tokens en development',
  },
  {
    slug: 'tokens:staging:write',
    description: 'Crear y modificar tokens en staging',
  },
  {
    slug: 'tokens:production:write',
    description: 'Crear y modificar tokens en production',
  },
  { slug: 'themes:*', description: 'Gestion completa de themes' },
  { slug: 'themes:read', description: 'Leer themes' },
  { slug: 'themes:write', description: 'Crear y modificar themes' },
  { slug: 'versions:*', description: 'Gestion completa de versiones' },
  { slug: 'versions:read', description: 'Leer versiones publicadas de tokens' },
  { slug: 'versions:create', description: 'Crear versiones de tokens' },
  { slug: 'versions:publish', description: 'Publicar versiones' },
  { slug: 'environments:*', description: 'Gestion completa de ambientes' },
  { slug: 'environments:read', description: 'Leer ambientes' },
  { slug: 'environments:list', description: 'Listar ambientes disponibles' },
  {
    slug: 'environments:use',
    description: 'Seleccionar ambiente activo en el CLI',
  },
  {
    slug: 'environments:write',
    description: 'Modificar ambientes no productivos',
  },
  {
    slug: 'environments:diff',
    description: 'Comparar cambios entre ambientes',
  },
  {
    slug: 'environments:merge',
    description: 'Fusionar cambios entre ambientes',
  },
  {
    slug: 'environments:promote',
    description: 'Promover cambios entre ambientes',
  },
  {
    slug: 'merge-requests:*',
    description: 'Gestion completa de merge requests',
  },
  { slug: 'merge-requests:read', description: 'Leer merge requests' },
  { slug: 'merge-requests:create', description: 'Crear merge requests' },
  { slug: 'merge-requests:approve', description: 'Aprobar merge requests' },
  {
    slug: 'merge-requests:merge',
    description: 'Fusionar merge requests aprobados',
  },
  { slug: 'merge-requests:close', description: 'Cerrar merge requests' },
  { slug: 'sync:*', description: 'Gestion completa de sincronizacion' },
  { slug: 'sync:read', description: 'Descargar tokens desde CLI' },
  {
    slug: 'sync:pull',
    description: 'Descargar snapshots de tokens desde el registry',
  },
  {
    slug: 'sync:build',
    description: 'Generar archivos locales desde tokens descargados',
  },
  {
    slug: 'sync:status',
    description: 'Consultar estado local y remoto de sincronizacion',
  },
  { slug: 'sync:report', description: 'Registrar reportes de sincronizacion' },
];

const roles: SeedRole[] = [
  {
    slug: 'owner',
    name: 'Owner',
    description:
      'Control total de la organizacion, miembros, billing, API keys, merge requests y datos',
    scope: 'organization',
    level: 10,
    isSystem: true,
    permissions: ['*'],
  },
  {
    slug: 'admin',
    name: 'Admin',
    description:
      'Gestion de proyectos, apps, tokens, themes, versiones, ambientes y merge requests',
    scope: 'organization',
    level: 20,
    isSystem: true,
    permissions: [
      'organization:read',
      'organization:update',
      'users:*',
      'api-keys:*',
      'projects:*',
      'apps:*',
      'tokens:*',
      'themes:*',
      'versions:*',
      'environments:*',
      'merge-requests:*',
      'sync:*',
    ],
  },
  {
    slug: 'editor',
    name: 'Editor',
    description:
      'Crear y modificar tokens, themes y cambios en ambientes no productivos',
    scope: 'organization',
    level: 40,
    isSystem: true,
    permissions: [
      'organization:read',
      'projects:read',
      'projects:update',
      'apps:read',
      'apps:manage',
      'tokens:read',
      'tokens:push',
      'tokens:development:write',
      'tokens:staging:write',
      'themes:read',
      'themes:write',
      'versions:read',
      'versions:create',
      'environments:read',
      'environments:list',
      'environments:use',
      'environments:write',
      'environments:diff',
      'environments:merge',
      'environments:promote',
      'merge-requests:read',
      'merge-requests:create',
      'merge-requests:close',
      'sync:read',
      'sync:pull',
      'sync:build',
      'sync:status',
      'sync:report',
    ],
  },
  {
    slug: 'viewer',
    name: 'Viewer',
    description:
      'Acceso de solo lectura a proyectos, tokens, versiones, merge requests y dashboard',
    scope: 'organization',
    level: 90,
    isSystem: true,
    permissions: [
      'organization:read',
      'projects:read',
      'apps:read',
      'tokens:read',
      'themes:read',
      'versions:read',
      'environments:read',
      'environments:list',
      'environments:use',
      'environments:diff',
      'merge-requests:read',
      'sync:read',
      'sync:pull',
      'sync:build',
      'sync:status',
    ],
  },
  {
    slug: 'cli-service',
    name: 'CLI Service',
    description:
      'Rol tecnico para API keys usadas por automatizaciones del CLI',
    scope: 'organization',
    level: 80,
    isSystem: true,
    permissions: [
      'organization:read',
      'projects:read',
      'apps:read',
      'tokens:read',
      'themes:read',
      'versions:read',
      'environments:read',
      'environments:list',
      'environments:use',
      'environments:diff',
      'merge-requests:read',
      'sync:read',
      'sync:pull',
      'sync:build',
      'sync:status',
      'sync:report',
    ],
  },
  {
    slug: 'project-owner',
    name: 'Project Owner',
    description:
      'Control total sobre un proyecto, sus miembros, tokens, ambientes, versiones y merge requests',
    scope: 'project',
    level: 10,
    isSystem: true,
    permissions: [
      'projects:read',
      'projects:update',
      'projects:delete',
      'project-members:*',
      'apps:*',
      'tokens:*',
      'themes:*',
      'versions:*',
      'environments:*',
      'merge-requests:*',
      'sync:*',
    ],
  },
  {
    slug: 'project-maintainer',
    name: 'Project Maintainer',
    description:
      'Mantener tokens, ambientes, versiones y merge requests de un proyecto',
    scope: 'project',
    level: 30,
    isSystem: true,
    permissions: [
      'projects:read',
      'projects:update',
      'project-members:read',
      'apps:read',
      'apps:manage',
      'tokens:*',
      'themes:*',
      'versions:*',
      'environments:*',
      'merge-requests:*',
      'sync:*',
    ],
  },
  {
    slug: 'project-editor',
    name: 'Project Editor',
    description:
      'Editar tokens, themes y cambios no productivos dentro de un proyecto',
    scope: 'project',
    level: 50,
    isSystem: true,
    permissions: [
      'projects:read',
      'project-members:read',
      'apps:read',
      'tokens:read',
      'tokens:push',
      'tokens:development:write',
      'tokens:staging:write',
      'themes:read',
      'themes:write',
      'versions:read',
      'versions:create',
      'environments:read',
      'environments:list',
      'environments:use',
      'environments:write',
      'environments:diff',
      'environments:merge',
      'merge-requests:read',
      'merge-requests:create',
      'merge-requests:close',
      'sync:read',
      'sync:pull',
      'sync:build',
      'sync:status',
      'sync:report',
    ],
  },
  {
    slug: 'project-viewer',
    name: 'Project Viewer',
    description: 'Acceso de solo lectura a un proyecto',
    scope: 'project',
    level: 90,
    isSystem: true,
    permissions: [
      'projects:read',
      'project-members:read',
      'apps:read',
      'tokens:read',
      'themes:read',
      'versions:read',
      'environments:read',
      'environments:list',
      'environments:use',
      'environments:diff',
      'merge-requests:read',
      'sync:read',
      'sync:pull',
      'sync:build',
      'sync:status',
    ],
  },
];

export class SeedRolesPermissions9999999999999 implements MigrationInterface {
  name = 'SeedRolesPermissions9999999999999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const permission of permissions) {
      await queryRunner.query(
        `
          INSERT INTO "permissions" ("slug", "description", "deleted_at")
          VALUES ($1, $2, NULL)
          ON CONFLICT ("slug")
          DO UPDATE SET
            "description" = EXCLUDED."description",
            "deleted_at" = NULL,
            "updated_at" = now()
        `,
        [permission.slug, permission.description],
      );
    }

    for (const role of roles) {
      await queryRunner.query(
        `
          INSERT INTO "roles" ("organization_id", "slug", "name", "description", "scope", "level", "is_system", "deleted_at")
          VALUES (NULL, $1, $2, $3, $4, $5, $6, NULL)
          ON CONFLICT ("slug") WHERE "organization_id" IS NULL AND "deleted_at" IS NULL
          DO UPDATE SET
            "name" = EXCLUDED."name",
            "description" = EXCLUDED."description",
            "scope" = EXCLUDED."scope",
            "level" = EXCLUDED."level",
            "is_system" = EXCLUDED."is_system",
            "updated_at" = now()
        `,
        [
          role.slug,
          role.name,
          role.description,
          role.scope,
          role.level,
          role.isSystem,
        ],
      );
    }

    for (const role of roles) {
      await queryRunner.query(
        `
          DELETE FROM "role_permissions"
          WHERE "role_id" = (
            SELECT "id"
            FROM "roles"
            WHERE "slug" = $1
              AND "organization_id" IS NULL
              AND "deleted_at" IS NULL
          )
        `,
        [role.slug],
      );

      for (const permissionSlug of role.permissions) {
        await queryRunner.query(
          `
            INSERT INTO "role_permissions" ("role_id", "permission_id")
            SELECT role_row."id", permission_row."id"
            FROM "roles" role_row
            JOIN "permissions" permission_row ON permission_row."slug" = $2
            WHERE role_row."slug" = $1
              AND role_row."organization_id" IS NULL
              AND role_row."deleted_at" IS NULL
              AND permission_row."deleted_at" IS NULL
            ON CONFLICT ("role_id", "permission_id") DO NOTHING
          `,
          [role.slug, permissionSlug],
        );
      }
    }

    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

    if (!superAdminEmail || !superAdminPassword) {
      throw new Error(
        'SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD are required to seed the owner user',
      );
    }

    const passwordHash = await hashPassword(
      superAdminPassword,
      Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
    );

    await queryRunner.query(
      `
        INSERT INTO "organizations" ("slug", "name", "billing_email", "plan", "status", "metadata", "deleted_at")
        VALUES ($1, $2, $3, 'enterprise', 'active', $4::jsonb, NULL)
        ON CONFLICT ("slug") WHERE "deleted_at" IS NULL
        DO UPDATE SET
          "name" = EXCLUDED."name",
          "billing_email" = EXCLUDED."billing_email",
          "status" = 'active',
          "metadata" = "organizations"."metadata" || EXCLUDED."metadata",
          "deleted_at" = NULL,
          "updated_at" = now()
      `,
      [
        superAdminOrganization.slug,
        superAdminOrganization.name,
        superAdminEmail,
        JSON.stringify({ seed: 'super-admin-organization' }),
      ],
    );

    await queryRunner.query(
      `
        INSERT INTO "users" ("email", "name", "lastname", "password_hash", "status", "email_verified_at", "metadata", "deleted_at")
        VALUES ($1, 'Super', 'Admin', $2, 'active', now(), $3::jsonb, NULL)
        ON CONFLICT ("email") WHERE "deleted_at" IS NULL
        DO UPDATE SET
          "password_hash" = EXCLUDED."password_hash",
          "status" = 'active',
          "email_verified_at" = COALESCE("users"."email_verified_at", now()),
          "metadata" = "users"."metadata" || EXCLUDED."metadata",
          "deleted_at" = NULL,
          "updated_at" = now()
      `,
      [
        superAdminEmail,
        passwordHash,
        JSON.stringify({ seed: 'super-admin-user' }),
      ],
    );

    await queryRunner.query(
      `
        INSERT INTO "memberships" ("organization_id", "user_id", "role_id", "status", "invited_by", "invited_at", "joined_at", "deleted_at")
        SELECT organization_row."id", user_row."id", role_row."id", 'active', user_row."id", now(), now(), NULL
        FROM "organizations" organization_row
        JOIN "users" user_row ON user_row."email" = $2
        JOIN "roles" role_row ON role_row."slug" = 'owner'
        WHERE organization_row."slug" = $1
          AND organization_row."deleted_at" IS NULL
          AND user_row."deleted_at" IS NULL
          AND role_row."organization_id" IS NULL
          AND role_row."deleted_at" IS NULL
        ON CONFLICT ("organization_id", "user_id") WHERE "deleted_at" IS NULL
        DO UPDATE SET
          "role_id" = EXCLUDED."role_id",
          "status" = 'active',
          "joined_at" = COALESCE("memberships"."joined_at", now()),
          "removed_at" = NULL,
          "suspended_at" = NULL,
          "deleted_at" = NULL,
          "updated_at" = now()
      `,
      [superAdminOrganization.slug, superAdminEmail],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const roleSlugs = roles.map((role) => role.slug);
    const permissionSlugs = permissions.map((permission) => permission.slug);
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;

    if (superAdminEmail) {
      await queryRunner.query(
        `
          DELETE FROM "memberships"
          WHERE "organization_id" IN (
            SELECT "id"
            FROM "organizations"
            WHERE "slug" = $1
          )
            AND "user_id" IN (
              SELECT "id"
              FROM "users"
              WHERE "email" = $2
                AND "metadata"->>'seed' = 'super-admin-user'
            )
        `,
        [superAdminOrganization.slug, superAdminEmail],
      );

      await queryRunner.query(
        `
          DELETE FROM "users"
          WHERE "email" = $1
            AND "metadata"->>'seed' = 'super-admin-user'
        `,
        [superAdminEmail],
      );
    }

    await queryRunner.query(
      `
        DELETE FROM "organizations"
        WHERE "slug" = $1
          AND "metadata"->>'seed' = 'super-admin-organization'
          AND NOT EXISTS (
            SELECT 1
            FROM "memberships"
            WHERE "memberships"."organization_id" = "organizations"."id"
          )
      `,
      [superAdminOrganization.slug],
    );

    await queryRunner.query(
      `
        DELETE FROM "role_permissions"
        WHERE "role_id" IN (
          SELECT "id"
          FROM "roles"
          WHERE "slug" = ANY($1)
            AND "organization_id" IS NULL
        )
      `,
      [roleSlugs],
    );

    await queryRunner.query(
      `
        DELETE FROM "roles"
        WHERE "slug" = ANY($1)
          AND "organization_id" IS NULL
          AND "is_system" = true
      `,
      [roleSlugs],
    );

    await queryRunner.query(
      `
        DELETE FROM "permissions"
        WHERE "slug" = ANY($1)
          AND NOT EXISTS (
            SELECT 1
            FROM "role_permissions"
            WHERE "role_permissions"."permission_id" = "permissions"."id"
          )
      `,
      [permissionSlugs],
    );
  }
}

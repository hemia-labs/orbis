---
name: backend-architecture
description: Arquitectura, estándares y flujos para backends NestJS. Usar cuando Codex cree, revise o modifique código en backend/, especialmente módulos NestJS, entidades TypeORM, DTOs, servicios, controladores, permisos, migraciones, seeds, base de datos, file upload, auth, auditoría, configuración o refactors backend.
---

# NestJS Backend Guide

## Objetivo

Usar esta skill para trabajar en `backend/` siguiendo una arquitectura NestJS + TypeORM + PostgreSQL: módulos feature-based, DTOs con `class-validator`, permisos por decorator, migraciones TypeORM y servicios transaccionales cuando hay relaciones o snapshots.

Para detalles completos, leer [references/backend-guide.md](references/backend-guide.md) cuando la tarea toque arquitectura, entidades, migraciones, permisos, configuración, uploads o revisión de calidad.

## Mapa Rápido

- App root: `backend/src/app.module.ts`
- Bootstrap HTTP/CORS/cookies: `backend/src/main.ts`
- DB runtime: `backend/src/database/database.module.ts`
- TypeORM CLI: `backend/data-source.ts`
- Migraciones: `backend/src/database/migrations/`
- Features: `backend/src/modules/<feature>/`
- Entidades: `backend/src/modules/<feature>/entities/*.entity.ts`
- DTOs: `backend/src/modules/<feature>/dtos/*.dto.ts`
- Mappers: `backend/src/modules/<feature>/mappers/*.mapper.ts`
- Guards/decorators: `backend/src/common/guards`, `backend/src/common/decorators`
- Env schema: `backend/src/config/env.validation.ts`

## Workflow Para Cambios Backend

1. Leer el módulo existente más parecido antes de editar.
2. Mantener estructura del feature:
   - `<feature>.module.ts`
   - `<feature>.controller.ts`
   - `<feature>.service.ts`
   - `entities/`
   - `dtos/`
   - `mappers/` si hay DTO complejo o relaciones.
3. Registrar módulos nuevos en `AppModule`.
4. Registrar entidades con `TypeOrmModule.forFeature([...])`.
5. Proteger endpoints privados con `@UseGuards(JwtAuthGuard, AuthGuard)` y `@Permissions(...)`.
6. Validar input con DTOs y `ValidationPipe`.
7. Si cambia schema o seed, avisar que requiere migración, pero no generarla ni ejecutarla salvo instrucción explícita del usuario.
8. Ejecutar build según estructura del repo:
   - Monorepo con workspace: `pnpm --filter backend build`
   - Repo backend normal: `npm run build`, `pnpm build` o el script equivalente del `package.json`.
   - Tests si existen o si el cambio toca lógica compartida.

## Reglas Fuertes

- No usar `synchronize: true`; ya está en `false`.
- No modificar DB sin migración.
- No aceptar payloads sin DTO.
- No exponer secretos en endpoints públicos.
- No hard-delete por defecto; preferir soft delete con `DeleteDateColumn`.
- No meter lógica de negocio en controllers.
- No devolver entidades crudas si el módulo ya usa DTO/mappers.
- No usar relaciones cascada sin revisar borrado, restore y referencias.
- No agregar permisos nuevos sin actualizar el seed o mecanismo de permisos del proyecto.

## Convenciones Del Proyecto

- Rutas API: `api/v1/<resource>`.
- Permisos: `<resource>:view`, `<resource>:create`, `<resource>:edit`, `<resource>:delete`, `<resource>:restore`, comodines `<resource>:*`.
- UUID primary keys: `@PrimaryGeneratedColumn('uuid')`.
- Columnas DB snake_case vía `name`.
- Propiedades TS camelCase.
- Timestamps: `created_at`, `updated_at`, `deleted_at`.
- JSON flexible: `jsonb`.
- Enums TypeORM para estados/tipos cerrados.
- Índices parciales para unicidad con soft delete.

## Validación Rápida

Después de editar:

Si es monorepo con workspace:

```bash
pnpm --filter backend build
```

Si es repo backend normal:

```bash
npm run build
```

o:

```bash
pnpm build
```

No generar ni ejecutar migraciones desde esta skill. Si el cambio requiere migración, reportar claramente: "requiere migración manual". El usuario la crea/ejecuta manualmente.

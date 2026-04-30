# NestJS Backend Guide

## Índice

- [1. Stack Y Filosofía](#1-stack-y-filosofía)
- [2. Estructura Principal](#2-estructura-principal)
- [3. Base De Datos](#3-base-de-datos)
- [4. Entidades TypeORM](#4-entidades-typeorm)
- [5. Módulos](#5-módulos)
- [6. Controllers](#6-controllers)
- [7. Services](#7-services)
- [8. DTOs](#8-dtos)
- [9. Mappers](#9-mappers)
- [10. Permisos Y Auth](#10-permisos-y-auth)
- [11. Migraciones Y Seeds](#11-migraciones-y-seeds)
- [12. Configuración Dinámica](#12-configuración-dinámica)
- [13. Modelos Dinámicos Y Versionado](#13-modelos-dinámicos-y-versionado)
- [14. Archivos Y Uploads](#14-archivos-y-uploads)
- [15. Qué Está Bien](#15-qué-está-bien)
- [16. Qué Está Mal O Debe Mejorar](#16-qué-está-mal-o-debe-mejorar)
- [17. Estándares Para Nuevos Features](#17-estándares-para-nuevos-features)
- [18. Validación Final](#18-validación-final)

## 1. Stack Y Filosofía

Guía para backends NestJS con TypeORM, PostgreSQL, JWT/auth, cookies opcionales, `class-validator`, `class-transformer`, Joi para env y storage compatible con S3 cuando aplique.

Arquitectura recomendada: módulos por dominio en `backend/src/modules`. Cada feature encapsula controller, service, entities, DTOs y mapper cuando aplica. Controller expone HTTP; service contiene reglas de negocio; entities modelan DB; DTOs validan request/response.

Principio: seguir patrones existentes antes de inventar abstracciones.

## 2. Estructura Principal

```text
backend/
  data-source.ts
  package.json
  src/
    app.module.ts
    main.ts
    config/
      env.validation.ts
    database/
      database.module.ts
      migrations/
    common/
      decorators/
      guards/
      utils/
    modules/
      <feature>/
        <feature>.module.ts
        <feature>.controller.ts
        <feature>.service.ts
        dtos/
        entities/
        mappers/
```

`app.module.ts` importa `ConfigModule`, `DatabaseModule` y módulos funcionales. Módulo nuevo debe registrarse ahí si expone endpoints o providers usados por la app.

`main.ts` crea app Nest, activa middleware global, CORS, cookies si aplica y escucha `PORT`.

## 3. Base De Datos

Runtime DB vive normalmente en `src/database/database.module.ts`:

- `TypeOrmModule.forRootAsync`.
- Credenciales desde `ConfigService`.
- DB usual: `postgres`.
- Entidades por glob `**/*.entity.ts/js`.
- `synchronize: false`.
- Logging controlado por env.

CLI de migraciones suele vivir en `data-source.ts`:

- Carga `.env` y `.env.local`.
- Usa `src/**/*.entity.ts` en dev y `dist/**/*.entity.js` en prod.
- Usa `src/database/migrations/*.ts` o `dist/database/migrations/*.js`.

No usar cambios manuales en DB sin reflejarlos en migración. Desde esta skill, no generar ni ejecutar migraciones salvo instrucción explícita del usuario; indicar que el cambio requiere migración manual.

## 4. Entidades TypeORM

Ubicación:

```text
backend/src/modules/<feature>/entities/*.entity.ts
```

Patrón base:

```ts
@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
```

Convenciones:

- Tabla en plural snake_case: `resources`, `resource_items`.
- Propiedades TS camelCase: `resourceId`.
- Columnas DB snake_case: `@Column({ name: 'resource_id' })`.
- UUID FK explícita + relación:

```ts
@Column({ name: 'resource_id', type: 'uuid' })
resourceId: string;

@ManyToOne(() => Resource, { onDelete: 'RESTRICT' })
@JoinColumn({ name: 'resource_id' })
resource: Resource;
```

Usar `jsonb` para valores flexibles, metadata, configuración o payloads semi-estructurados.

Usar índices cuando:

- hay búsquedas frecuentes por estado/slug/FK.
- hay unicidad con soft delete:

```ts
@Index('IDX_resources_slug_active_unique', ['slug'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
```

Evitar:

- `synchronize: true`.
- columnas `varchar` sin length para datos conocidos.
- hard delete por defecto si la entidad tiene soft delete.
- relaciones bidireccionales innecesarias si no se consultan.

## 5. Módulos

Cada módulo debe importar DB + repositorios propios:

```ts
@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Resource])],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [ResourcesService],
})
export class ResourcesModule {}
```

Exportar service solo si otros módulos lo usan.

Si un service necesita entidades de otros módulos, registrar esas entidades en `forFeature` del módulo actual o importar el módulo que exporta el service necesario.

## 6. Controllers

Ubicación:

```text
backend/src/modules/<feature>/<feature>.controller.ts
```

Patrón:

```ts
@Controller('api/v1/resources')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, AuthGuard)
export class ResourcesController {
  constructor(private readonly service: ResourcesService) {}

  @Get()
  @Permissions('resources:view')
  async findAll(@Query(new ValidationPipe({ transform: true })) query: FilterResourceDto) {
    return this.service.findAll(query);
  }
}
```

Reglas:

- Controller no contiene lógica de negocio.
- Controller valida DTOs y delega.
- Rutas públicas deben estar en controller separado o endpoint explícitamente diseñado.
- Ordenar rutas específicas antes de `:id`: `slug/:slug`, `:id/history`, luego `:id`.
- Usar `@HttpCode(HttpStatus.NO_CONTENT)` cuando no se devuelve body.

## 7. Services

Services contienen:

- queries TypeORM.
- validaciones de existencia.
- validaciones de unicidad.
- transacciones.
- sincronización de relaciones.
- errores de dominio.

Errores esperados:

- `NotFoundException`
- `ConflictException`
- `BadRequestException`
- `ForbiddenException`
- `UnauthorizedException`

Patrón:

```ts
private async ensureExists(id: string, withDeleted = false): Promise<Resource> {
  const entity = await this.repository.findOne({ where: { id }, withDeleted });
  if (!entity) throw new NotFoundException('Resource not found');
  return entity;
}
```

Usar transacción cuando una operación:

- crea/actualiza varias tablas.
- crea snapshots o versiones.
- sincroniza relaciones many-to-many.
- sube archivos y luego crea registros.
- actualiza datos que deben quedar consistentes juntos.

## 8. DTOs

Ubicación:

```text
backend/src/modules/<feature>/dtos/*.dto.ts
```

Usar `class-validator`:

```ts
export class CreateResourceDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name: string;
}
```

Reglas:

- DTO de create: campos requeridos.
- DTO de update: campos opcionales.
- DTO de filter: query params opcionales, con `ValidationPipe({ transform: true })`.
- DTO de response: shape público; no meter passwords, hashes ni secrets.
- Mensajes en español si el proyecto ya está en español; si no, seguir idioma existente.

Evitar:

- aceptar `any`.
- aceptar `unknown` sin validar por tipo en service.
- exponer entidades completas con relaciones sensibles.

## 9. Mappers

Usar `mappers/` cuando:

- response DTO no coincide 1:1 con entity.
- hay relaciones a resumir.
- hay campos sensibles.
- hay formateo de snapshots.

Patrón:

```ts
export class ResourceMapper {
  static toDTO(entity: Resource): ResourceDto { ... }
  static toEntity(dto: CreateResourceDto): Resource { ... }
  static toUpdateEntity(dto: UpdateResourceDto): Partial<Resource> { ... }
}
```

Para módulos simples se puede mapear dentro del service, pero si crece, extraer mapper.

## 10. Permisos Y Auth

Patrón común:

- decorator `@Permissions(...)`.
- guard JWT para autenticación.
- guard de autorización para permisos.

Wildcard típico:

- `*`
- `<resource>:*`
- permiso exacto como `<resource>:view`

Si agregas endpoint nuevo:

1. Definir permiso en controller.
2. Agregar permiso al seed o mecanismo de permisos del proyecto.
3. Agregar permiso a roles/perfiles si aplica.
4. Validar frontend con mismo permiso si hay UI.

Naming recomendado:

- `<resource>:view`
- `<resource>:create`
- `<resource>:edit`
- `<resource>:delete`
- `<resource>:restore`
- acciones extra: `<resource>:publish`, `<resource>:approve`, `<resource>:export`

Ojo: si backend usa permiso distinto al frontend, UI puede mostrar botón que luego da 403.

## 11. Migraciones Y Seeds

Migraciones suelen vivir en:

```text
backend/src/database/migrations/
```

Comandos de referencia si el usuario pide explícitamente trabajar con migraciones. No ejecutarlos automáticamente.

Monorepo con workspace:

```bash
pnpm --filter backend migration:generate
pnpm --filter backend migration:run
pnpm --filter backend migration:revert
```

Repo backend normal, según scripts del `package.json`:

```bash
npm run migration:generate
npm run migration:run
npm run migration:revert
```

o:

```bash
pnpm migration:generate
pnpm migration:run
pnpm migration:revert
```

Para prod, solo si existe script equivalente y el usuario lo pide.

Reglas:

- Toda entity nueva o cambio de columna requiere migración manual.
- Seeds base pueden vivir en migraciones si forman parte del estado inicial requerido.
- Usar `ON CONFLICT DO NOTHING` o `ON CONFLICT DO UPDATE` para seeds idempotentes.
- En `down`, revertir lo insertado si es razonable y seguro.

No hacer:

- editar migración ya aplicada en ambientes compartidos sin acordarlo.
- mezclar cambios de schema y seed enorme sin necesidad.
- borrar datos de usuario en `down` salvo seeds conocidos.

## 12. Configuración Dinámica

Para configuración editable desde admin o API, usar tabla genérica de key/value solo si el dominio lo justifica.

Patrón recomendado:

- `key`: único y estable.
- `value`: `jsonb`.
- `type`: tipo esperado (`text`, `number`, `boolean`, `array`, `json`, etc.).
- `group`: agrupación visual/lógica.
- `isPublic`: si puede exponerse públicamente.
- `isReadonly`: si solo cambia por seed/migración.

Reglas:

- secrets nunca públicos.
- endpoint público debe filtrar por `isPublic`.
- validar `value` contra `type` en service.
- bloquear update si `isReadonly`.
- para archivos/imagenes, preferir referencia a entidad de archivo/asset sobre URL libre cuando el proyecto tenga gestor de archivos.

## 13. Modelos Dinámicos Y Versionado

Cuando un sistema permite campos dinámicos o schemas editables:

- separar definición de schema y datos capturados.
- versionar schema si datos antiguos dependen de definición previa.
- guardar snapshots para auditoría, publicación o rollback.
- sincronizar valores dinámicos dentro de transacción.

Publish/version workflow genérico:

1. Guardar draft.
2. Crear snapshot.
3. Publicar snapshot.
4. Copiar snapshot publicado al estado consultable actual si el dominio lo requiere.

Riesgos:

- Cambiar schema sin versionar rompe datos existentes.
- Publicar sin snapshot consistente rompe historial.
- Relaciones y valores dinámicos deben sincronizarse juntos.

## 14. Archivos Y Uploads

Separar:

- metadata del archivo en DB.
- objeto binario en storage.
- referencias desde otras entidades.

Storage común:

- local.
- S3 compatible.
- proveedor externo.

Reglas:

- Guardar metadata: filename, originalName, mimeType, size, storageKey, url, uploader.
- No borrar archivo si está referenciado.
- `hardDelete` debe eliminar objeto remoto si existe `storageKey`.
- `delete` normal debe soft-delete cuando el dominio requiere recuperación.
- Upload scope debe ser explícito si hay distintos contextos.

## 15. Qué Está Bien

- Feature-based modules claros.
- DB centralizada y `synchronize: false`.
- DTOs con validación.
- Soft delete en entidades principales.
- Permisos con wildcard.
- Versioning/snapshots para flujos publicables o auditables.
- Separación metadata de archivo vs object storage.
- Configuración tipada con endpoint público/privado cuando aplica.
- Índices para slugs activos y consultas frecuentes.

## 16. Qué Está Mal O Debe Mejorar

- Permisos inconsistentes entre backend y frontend.
- Logging TypeORM siempre activo en producción.
- Mezclar lógica de negocio en controllers.
- Algunos módulos con mappers y otros con mapping inline sin criterio.
- Respuestas que devuelven entities crudas con relaciones sensibles.
- Migraciones/seeds demasiado grandes o mezcladas.
- Falta de tests en services críticos.
- DTOs con JSON flexible sin validación posterior.
- Hard delete sin verificar referencias.

## 17. Estándares Para Nuevos Features

Checklist:

1. Crear carpeta `backend/src/modules/<feature>/`.
2. Crear entity con UUID, timestamps y soft delete si aplica.
3. Crear DTOs `create`, `update`, `filter`, response.
4. Crear mapper si response no es trivial.
5. Crear service con repository injectado.
6. Crear controller `api/v1/<resource>`.
7. Agregar permisos si el endpoint es privado.
8. Crear module con `TypeOrmModule.forFeature`.
9. Registrar module en `AppModule`.
10. Indicar que se requiere migración manual si cambió schema/seed.
11. Ejecutar build.

Ejemplo de permisos:

```ts
@Get()
@Permissions('widgets:view')

@Post()
@Permissions('widgets:create')

@Put(':id')
@Permissions('widgets:edit')

@Delete(':id')
@Permissions('widgets:delete')
```

## 18. Validación Final

Mínimo en monorepo con workspace:

```bash
pnpm --filter backend build
```

Mínimo en repo backend normal:

```bash
npm run build
```

o script equivalente:

```bash
pnpm build
```

No ejecutar migraciones. Si hay cambio de schema/seed, reportar que requiere migración manual.

Si hay lógica crítica:

```bash
npm test
```

En respuesta final, mencionar:

- archivos tocados.
- si el cambio requiere migración manual.
- comandos ejecutados.
- limitaciones: DB no disponible, tests inexistentes, errores previos, etc.

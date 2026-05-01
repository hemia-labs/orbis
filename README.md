# Orbis

The source of design truth.

Plataforma SaaS + CLI para gestionar, versionar y sincronizar design tokens multi-plataforma. Definí los tokens una vez y distribuilos a Web, Mobile y Desktop sin fricción.

Desarrollado por **Hemia**.

---

## Cómo funciona

1. **Definís** tokens primitivos y semánticos desde el dashboard SaaS.
2. **Promové** cambios entre entornos (`development` → `staging` → `production`) vía merge requests con revisión de conflictos.
3. **Sincronizás** vía CLI o API — cada app recibe los tokens en su formato nativo (CSS, Tailwind, TypeScript, Flutter, iOS, Android, Figma…).
4. **Versionás** snapshots y releases para trazabilidad completa.

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend SaaS | Vue 3 + Tailwind CSS 4 |
| Backend API | Node.js (NestJS) |
| Base de datos | PostgreSQL |
| Storage | S3 / R2 compatible |
| CLI | TypeScript, paquete `@orbis/cli`, binario `orbis` |
| Package manager | pnpm (monorepo workspace) |

---

## Estructura del monorepo

```
orbis/
  backend/     — NestJS API, registry interno
  frontend/    — SaaS Vue 3 + Tailwind CSS
  packages/    — (futuro) cli, core, transformers, sdk
```

---

## Requisitos

- Node.js ≥ 20
- pnpm ≥ 9
- PostgreSQL ≥ 16

---

## Configuración inicial

```bash
# Instalar dependencias
pnpm install

# Variables de entorno
cp backend/.env.example backend/.env
# Editar backend/.env con tus credenciales de PostgreSQL
```

---

## Comandos

| Comando | Descripción |
|---|---|
| `pnpm dev:backend` | Inicia backend en modo watch |
| `pnpm dev:frontend` | Inicia frontend Vite |
| `pnpm build:backend` | Build del backend |
| `pnpm build:frontend` | Build del frontend |
| `pnpm test:backend` | Tests del backend |
| `pnpm test:frontend` | Tests del frontend |
| `pnpm lint` | Linting |
| `pnpm format` | Formateo |

### Migraciones (backend)

```bash
cd backend

# Generar una migración
pnpm run migration:generate src/database/migrations/Migration -d data-source.ts

# Ejecutar migraciones
pnpm run migration:run -d data-source.ts

# Revertir última migración
pnpm run migration:revert -d data-source.ts
```

---

## Modelo de datos

### Multi-tenant
PostgreSQL con `organization_id` en las tablas compartidas. Cada organización es una unidad aislada de usuarios, proyectos y tokens.

### Entidades principales

```
organizations ──┬── users (vía memberships)
                ├── projects ──┬── environments
                │              ├── tokens (con referencias y versionado)
                │              ├── themes ── theme_overrides
                │              ├── merge_requests ── merge_conflicts
                │              ├── apps (por plataforma/framework)
                │              └── sync_reports
                ├── api_keys
                └── roles ── role_permissions (N:M con permissions)
```

### Permisos

Formato: `nivel1:nivel2:nivel3`. Soporta wildcards (`*`, `tokens:*`, `tokens:development:write`).

Roles MVP: `owner`, `admin`, `editor`, `viewer`, `cli_service`.

### API Keys

- Formato: `orb_live_xxxxxxxxx`
- Se hashean antes de persistir
- Tienen scopes configurables y pueden revocarse

---

## Flujo de cambios (MVP)

SaaS-first: el usuario edita tokens en el SaaS. El CLI solo consume.

```
development → staging → production
```

Los cambios solo afectan producción tras merge/promote explícito.

---

## Outputs por plataforma

| Plataforma | Formatos |
|---|---|
| Web | CSS variables, Tailwind CSS, TypeScript, JSON |
| Mobile | Flutter (.dart), Android (XML), iOS (Swift) |

---

## Licencia

Propietario. Todos los derechos reservados por Hemia.

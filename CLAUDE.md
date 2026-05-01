# Orbis — Design Token Management Platform

SaaS + CLI para gestionar, versionar y sincronizar design tokens multi-plataforma.
Desarrollado por Hemia.

## Stack

| Capa | Tecnologia |
|---|---|
| Frontend SaaS | Vue 3 + Tailwind CSS 4 |
| Backend API | Node.js (NestJS) |
| Base de datos | PostgreSQL |
| Storage snapshots | S3/R2 compatible |
| CLI | TypeScript, paquete `@orbis/cli`, binario `orbis` |
| Package manager | pnpm (workspace monorepo) |

## Estructura del monorepo

```
orbis/
  backend/     — NestJS API, registry interno
  frontend/    — SaaS Vue 3 + Tailwind CSS
  packages/    — (futuro) cli, core, transformers, sdk
```

## Comandos desde la raiz

| Comando | Descripcion |
|---|---|
| `pnpm dev:backend` | Inicia backend en modo watch |
| `pnpm dev:frontend` | Inicia frontend Vite |
| `pnpm build:backend` | Build del backend |
| `pnpm build:frontend` | Build del frontend |
| `pnpm test:backend` / `test:frontend` | Tests |
| `pnpm lint` / `pnpm format` | Linting y formateo |

## Convenciones y decisiones

- **Producto visible:** Orbis. Modulo interno: Orbis Registry. Paquete CLI: `@orbis/cli`. Binario: `orbis`.
- **Multi-tenant:** PostgreSQL con `organization_id` en tablas compartidas.
- **Flujo principal (MVP):** SaaS-first — el usuario edita tokens en el SaaS, el CLI solo consume.
- **Ambientes:** `development` → `staging` → `production`. Cambios solo afectan produccion tras merge/promote explicito.
- **Permisos:** Formato `nivel1:nivel2:nivel3`. Soporta wildcards (`*`, `tokens:*`, `tokens:development:write`).
- **Roles MVP:** owner, admin, editor, viewer, cli_service.

## Entidades principales

Organizations, Users, Memberships, Projects, Apps, Tokens (primitivos y semanticos), Themes, ThemeOverrides, Environments, TokenVersions, TokenSnapshots, ApiKeys, SyncReports, MergeRequests, MergeConflicts.

## API keys

- Formato: `orb_live_xxxxxxxxx`
- Se hashean en backend antes de guardar
- Tienen scopes y pueden revocarse

## Outputs por plataforma

Web: CSS variables, Tailwind CSS, TypeScript, JSON.
Mobile: Flutter (.dart), Android (XML), iOS (Swift).

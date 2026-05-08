import type { PermissionRequirement } from '@/lib/authz'

export const routePermissions = {
  home: 'organization:read',
  projects: 'projects:read',
  tokens: 'tokens:read',
  themes: 'themes:read',
  mergeRequests: 'merge-requests:read',
  team: { any: ['users:invite', 'users:manage'] },
  settings: 'organization:update',
} satisfies Record<string, PermissionRequirement>

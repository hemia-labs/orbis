import type { RouteRecordRaw } from 'vue-router'
import { homeRoutes } from '@/router/routes/home.routes'
import { mergeRequestRoutes } from '@/router/routes/merge-requests.routes'
import { projectRoutes } from '@/router/routes/projects.routes'
import { settingsRoutes } from '@/router/routes/settings.routes'
import { teamRoutes } from '@/router/routes/team.routes'
import { themeRoutes } from '@/router/routes/themes.routes'
import { tokenRoutes } from '@/router/routes/tokens.routes'

export const privateRoutes: RouteRecordRaw[] = [
  ...homeRoutes,
  ...projectRoutes,
  ...tokenRoutes,
  ...themeRoutes,
  ...mergeRequestRoutes,
  ...teamRoutes,
  ...settingsRoutes,
]

<script setup lang="ts">
import {
  AlertCircle,
  Bell,
  CalendarDays,
  ChevronDown,
  Filter,
  Home,
  MoreHorizontal,
  Search,
  Settings,
  SlidersHorizontal,
  User,
} from 'lucide-vue-next'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@/components/ui/button-group'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
</script>

<template>
  <section class="grid gap-4 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
    <article class="rounded-lg border bg-background p-5 shadow-xs">
      <p class="text-sm font-medium text-muted-foreground">Proyectos activos</p>
      <p class="mt-3 text-3xl font-semibold">12</p>
    </article>
    <article class="rounded-lg border bg-background p-5 shadow-xs">
      <p class="text-sm font-medium text-muted-foreground">Tokens publicados</p>
      <p class="mt-3 text-3xl font-semibold">284</p>
    </article>
    <article class="rounded-lg border bg-background p-5 shadow-xs">
      <p class="text-sm font-medium text-muted-foreground">Ambientes</p>
      <p class="mt-3 text-3xl font-semibold">6</p>
    </article>
    <article class="rounded-lg border bg-background p-5 shadow-xs">
      <p class="text-sm font-medium text-muted-foreground">MR pendientes</p>
      <p class="mt-3 text-3xl font-semibold">3</p>
    </article>
  </section>

  <section class="grid gap-4 px-4 pb-6 sm:px-6 xl:grid-cols-[1.2fr_0.8fr]">
    <Card>
      <CardHeader>
        <div>
          <CardTitle>UI theme smoke test</CardTitle>
          <CardDescription>Componentes base usando los tokens semanticos actuales.</CardDescription>
        </div>
        <CardAction>
          <Badge>Primary</Badge>
        </CardAction>
      </CardHeader>
      <CardContent class="grid gap-6">
        <div class="grid gap-3">
          <h2 class="text-sm font-medium">Buttons, badge, avatar, tooltip</h2>
          <div class="flex flex-wrap items-center gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Badge variant="secondary">Secondary badge</Badge>
            <Badge variant="outline">Outline badge</Badge>
            <Avatar>
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button variant="outline" size="icon">
                    <Bell />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Tooltip themed</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <Separator />

        <div class="grid gap-3">
          <h2 class="text-sm font-medium">Inputs, label, checkbox, switch, select</h2>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="grid gap-2">
              <Label for="theme-search">Search</Label>
              <div class="relative">
                <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="theme-search" class="pl-9" placeholder="Buscar token..." />
              </div>
            </div>
            <div class="grid gap-2">
              <Label for="theme-select">Native select</Label>
              <NativeSelect id="theme-select">
                <NativeSelectOption value="primary">Primary</NativeSelectOption>
                <NativeSelectOption value="secondary">Secondary</NativeSelectOption>
              </NativeSelect>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-5">
            <label class="flex items-center gap-2 text-sm">
              <Checkbox checked />
              Checkbox
            </label>
            <label class="flex items-center gap-2 text-sm">
              <Switch checked />
              Switch
            </label>
          </div>
        </div>

        <Separator />

        <FieldGroup>
          <FieldSet>
            <FieldLegend>Field set</FieldLegend>
            <FieldDescription>Valida estilos de field, title, content, separator y descripcion.</FieldDescription>
            <Field>
              <FieldLabel>Nombre del token</FieldLabel>
              <FieldContent>
                <FieldTitle>color.primary.500</FieldTitle>
                <FieldDescription>Referencia principal del sistema.</FieldDescription>
              </FieldContent>
            </Field>
            <FieldSeparator>or</FieldSeparator>
            <Field>
              <Input placeholder="--color-primary-500" />
            </Field>
          </FieldSet>
        </FieldGroup>
      </CardContent>
      <CardFooter class="border-t">
        <Button variant="link" class="px-0">Link button</Button>
      </CardFooter>
    </Card>

    <div class="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Navigation tokens</CardTitle>
          <CardDescription>Breadcrumb, dropdown y button-group.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <span class="text-muted-foreground">Dashboard</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Tokens</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div class="flex flex-wrap items-center gap-3">
            <ButtonGroup>
              <Button variant="outline" size="sm">
                <Home />
                Vista
              </Button>
              <ButtonGroupSeparator />
              <ButtonGroupText>24</ButtonGroupText>
              <ButtonGroupSeparator />
              <Button variant="outline" size="sm">
                <SlidersHorizontal />
              </Button>
            </ButtonGroup>

            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline">
                  Menu
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  Ajustes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle />
        <AlertTitle>Alert default</AlertTitle>
        <AlertDescription>Usa card, foreground, border y muted foreground.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Alert destructive</AlertTitle>
        <AlertDescription>Valida el token destructive con contraste.</AlertDescription>
      </Alert>
    </div>
  </section>

  <section class="grid gap-4 px-4 pb-6 sm:px-6 xl:grid-cols-3">
    <Card>
      <CardHeader>
        <CardTitle>Overlays</CardTitle>
        <CardDescription>Dialog, sheet y alert dialog.</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogDescription>Popover, background, border y ring deben verse consistentes.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline">Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet title</SheetTitle>
              <SheetDescription>Panel lateral con el tema actual.</SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <Button>Aplicar</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button variant="destructive">Alert dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminar token?</AlertDialogTitle>
              <AlertDialogDescription>Este modal usa destructive, border y popover.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Calendar and loading</CardTitle>
        <CardDescription>Calendar, skeleton y estados muted.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="rounded-md border">
          <Calendar />
        </div>
        <div class="grid gap-2">
          <Skeleton class="h-4 w-3/4" />
          <Skeleton class="h-4 w-1/2" />
          <Skeleton class="h-10 w-full" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Sidebar elements</CardTitle>
        <CardDescription>Tokens especificos de sidebar.</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="rounded-lg border bg-sidebar p-3 text-sidebar-foreground">
          <SidebarGroup>
            <SidebarGroupLabel>Producto</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton is-active>
                    <CalendarDays />
                    <span>Tokens</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>12</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Filter />
                    <span>Filtros</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </CardContent>
    </Card>
  </section>

  <section class="px-4 pb-6 sm:px-6">
    <Card>
      <CardHeader>
        <CardTitle>Table</CardTitle>
        <CardDescription>Tabla, rows, headers, hover y badges.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead class="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell class="font-medium">color.primary.500</TableCell>
              <TableCell><Badge>Color</Badge></TableCell>
              <TableCell><Badge variant="secondary">Activo</Badge></TableCell>
              <TableCell class="text-right">
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">color.error.500</TableCell>
              <TableCell><Badge variant="destructive">Estado</Badge></TableCell>
              <TableCell><Badge variant="outline">Revision</Badge></TableCell>
              <TableCell class="text-right">
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </section>
</template>

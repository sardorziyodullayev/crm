# Edura — CRM for Educational Centers

Premium CRM SaaS frontend for educational centers in **Uzbekistan** — built as a production-grade, senior-level reference implementation.

> Stack: **React 19**, **Vite**, **TypeScript**, **Mantine v8**, **Mantine React Table**, **TanStack Query**, **Zustand**, **React Router v7**, **Framer Motion**, **Recharts**, **Zod**.

---

## What's inside

A coherent, premium-feeling SaaS workspace with:

- **Authentication** — login, register, OTP verification, forgot password, protected routes, session persistence
- **App shell** — collapsible sidebar with grouped navigation, glass topbar, command palette (⌘ K), notification drawer, dark/light mode, responsive mobile nav
- **Dashboard** — animated KPI widgets, gradient revenue chart, growth bar chart, lead-source donut, live activity feed, quick actions
- **Students** — searchable/filterable table, full create/edit modal with tabs and Zod validation, profile page (overview, attendance, payments, activity timeline)
- **Groups** — premium group cards with capacity, schedule and mentor info; full group details (roster, schedule, financials)
- **Teachers** — roster table with rating, salary, status, branch
- **Payments** — KPI strip, status filters, sortable invoice table
- **Leads** — kanban funnel with optimistic drag-between-columns and sources/value totals per stage
- **Attendance** — per-group daily roster, status pills, calendar of recent sessions
- **Tasks** — kanban task board (todo / in-progress / review / done) with optimistic moves
- **Calendar** — weekly schedule generated from group rotations
- **Reports** — financial and growth analytics
- **Notifications** — in-app notification center + drawer
- **Settings** — workspace branding, appearance (theme, density, language), security, integrations (Telegram bot, Payme/Click)
- **Activity log** — audit timeline

All powered by a fully realistic **mock data layer** (Uzbek names, UZS currency, real course names, payments distribution).

---

## Architecture — Feature-Sliced Design

```
src/
├── app/             # composition root: providers, theme, router, global styles
├── pages/           # route-level screens (lazy-loaded)
├── widgets/         # composite UI: AppShell, Sidebar, Topbar, NotificationDrawer, CommandPalette, AuthLayout
├── features/        # user-facing features with their own model + ui (auth, students CRUD)
├── entities/        # domain entities: student, group, teacher, payment, lead — each with model + api
└── shared/          # reusable platform: api, store, lib, ui, config
```

Every layer follows the same internal segments:

```
ui · model · api · lib · config
```

Public surfaces are exposed through **barrel files** (`index.ts`). Higher layers may only import from layers below them (FSD layer rule).

---

## Tooling

- **TypeScript strict** with project references (`tsconfig.app.json` / `tsconfig.node.json`)
- **ESLint** with `@typescript-eslint`, `react-hooks`, `import/order`, Prettier integration
- **Prettier** — opinionated config (single quotes, trailing commas, 100 cols)
- **Husky + lint-staged** — pre-commit hooks
- **PostCSS preset Mantine** + simple-vars for breakpoints
- **Vite** with manual chunking (`react`, `mantine`, `charts`, `query`, `motion`)
- **Path aliases**: `@app/*`, `@pages/*`, `@widgets/*`, `@features/*`, `@entities/*`, `@shared/*`, `@/*`

---

## Design system

- **Custom Mantine v8 theme** with brand / accent / success / warning / danger / slate palettes (10-shade tuples)
- **CSS variable resolver** drives semantic surfaces, glass background, hero gradient and shadows for dark/light themes
- **Component defaults** (Card, Modal, Button, Inputs, Badge, Menu, Tooltip) for consistent spacing, radius, motion
- Premium scrollbar, focus-ring, selection color, reduced-motion respect
- Reusable UI primitives: `SurfaceCard`, `StatCard`, `StatusBadge`, `EmptyState`, `AvatarStack`, `BrandLogo`, `PageHeader`, `PageTransition`, `LazyPage`, `ErrorBoundary`, `SplashScreen`, `DataTable`

---

## State, data & realism

- **Zustand** stores with persistence: `auth`, `theme`, `ui` (sidebar, command palette), `notifications`, `modals`
- **TanStack Query** (v5) with sensible defaults — staleTime 60s, no retry on 401/403/404, no refetch on focus
- **Axios** client with auth header injection and 401 → logout interceptor
- **Mock API layer** that mirrors a real REST shape (list / byId / create / update / delete / stats), with deterministic seed data: 240 students, 22 groups, 14 teachers, ~1.5k payments, 64 leads, 30-day attendance per group
- All currency formatted in UZS via `Intl.NumberFormat('uz-UZ')`
- **Optimistic mutations** for kanban (Leads, Tasks)

---

## Performance

- Route-level **code splitting** via `React.lazy`
- Manual Vite chunks for major vendors
- **`useMemo` / column factories** in tables; query keys are stable
- Suspense + skeletons everywhere; no layout shift
- Animations are GPU-friendly (transform / opacity only) and respect `prefers-reduced-motion`

---

## Getting started

```bash
# install (Node 20+)
npm install

# dev server
npm run dev

# typecheck
npm run typecheck

# production build
npm run build && npm run preview
```

Default demo credentials — pre-filled on the login screen:

```
email:    aziza@edura.uz
password: demo12345
```

The mock layer accepts anything; the form is just a realistic UX entry point.

---

## Notes & honest scope

This is a **frontend** reference implementation. The mock API layer simulates network latency and mirrors real REST shapes, so swapping in a real backend means replacing the `mockApi.ts` calls inside each entity's `api/*.ts` with `httpClient` calls — the entity contracts are ready.

Modules built end-to-end include Dashboard, Students (table + profile + form), Groups (cards + details), Payments, Leads (kanban), Attendance, Tasks, Calendar, Reports, Notifications, Settings, Activity log, Auth (login/register/OTP/forgot). A real production rollout would extend forms (Group create, Payment create, Lead create modals), wire Socket.IO for live notifications, and add i18n strings — the architecture is in place to do so without refactoring.

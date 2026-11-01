# CLIENTFLOW — COMPLETE PROJECT HANDOFF & DEVELOPMENT INSTRUCTIONS

**Project:** ClientFlow  
**Tagline:** Manage your clients, projects and business in one place.  
**Project type:** Production-oriented, multi-tenant SaaS application  
**Current development stage:** Authentication, database foundation, protected dashboard and workspace integration completed  
**Primary developer:** Rahul Chourasia  
**Primary objective:** Build a commercially viable SaaS product that is also a strong full-stack portfolio project.

---

# PART 1 — IMPORTANT INSTRUCTIONS FOR CLAUDE CODE

You are joining an existing project called ClientFlow.

This is NOT a request to generate a new project, replace the existing architecture, or redesign the application.

Your first responsibility is to understand the existing repository, code, architecture, database, UI components and approved design system.

## Non-negotiable development rules

1. Do not recreate the project from scratch.
2. Do not replace the existing folder structure without a clear technical reason and explicit approval.
3. Do not redesign approved screens or change the established design system.
4. Do not replace existing shadcn/ui components with custom implementations.
5. Do not modify downloaded shadcn/ui component files unless there is a genuine bug that requires it and the developer approves.
6. Do not introduce unnecessary dependencies.
7. Do not make several unrelated changes in one step.
8. Do not modify working authentication or database logic casually.
9. Do not assume Prisma schema field names, relation names, component names or file paths. Inspect the actual files.
10. Do not invent database records, customer testimonials, revenue, analytics or product capabilities.
11. Do not hardcode user-specific workspace information.
12. Do not expose secrets, passwords, tokens or database credentials.
13. Do not remove existing features or code simply because you prefer a different implementation.
14. Maintain compatibility with the currently installed package versions.
15. Explain architectural decisions and important code changes so the developer can learn.

### Required workflow

Before implementation:

1. Inspect the repository.
2. Read package.json and configuration files.
3. Inspect the Prisma schema.
4. Inspect authentication and authorization.
5. Inspect the application shell and UI components.
6. Inspect the current design tokens.
7. Inspect existing visual reference boards, if available.
8. Compare the implementation against the requirements in this document.
9. Identify discrepancies and risks.
10. Present your findings and proposed next step.

Do not start modifying files until the developer approves the implementation plan.

For each development task:

- Explain the purpose.
- Identify the exact files to modify or create.
- Explain why each change is needed.
- Make focused changes.
- Preserve existing functionality.
- Run relevant lint, TypeScript and build checks.
- Report modified files and test results.
- Wait for approval before moving to the next task.

The developer wants to learn while building. Avoid unexplained code dumps.

### Learning mode

Rahul is preparing for frontend developer interviews and must be able to explain every part of this codebase.

For each feature:

1. Explain the approach in simple language first.
2. Let Rahul write the first version of one file himself (for example the list page or the server action).
3. Review his code: what is good, what is wrong, and why.
4. Only then write the remaining files, explaining each one.

When Rahul asks a question, answer it before continuing. Prefer short explanations with a small example over long theory.

---

# PART 1B — MVP SCOPE (CURRENT PRIORITY)

The long-term vision in this document is large. The current priority is a finished, deployed and tested MVP that Rahul can show in job interviews.

## MVP scope, target: December 13, 2026

1. Clients: list, create, view, edit, delete, search.
2. Projects: list, create, view, edit, delete, linked to clients.
3. Tasks: list and kanban views, create, edit, delete, linked to projects.
4. Dashboard built from real workspace data.
5. Basic invoices: create with line items, list, mark as paid.
6. Automated tests (see Part 24).
7. Deployment to Vercel with a demo login.

## Deferred until after the MVP

Calendar, team and invitations, notifications, settings beyond the user profile, marketing website, demo mode, subscription billing, workspace switching.

Do not start deferred features unless Rahul explicitly asks.

## Build order

Clients → Projects → Tasks → Dashboard → Invoices.

The dashboard comes after Clients, Projects and Tasks because it displays their data. Building it first would produce only empty states with nothing to test against.

---

# PART 2 — PRODUCT VISION

## What is ClientFlow?

ClientFlow is a business management platform that allows freelancers, independent developers, designers, consultants and agencies to manage their business operations from one place.

The main workflow is:

New Client → Create Client → Create Project → Create Tasks → Track Project → Create Invoice → Track Payment → View Business Analytics.

The application should feel like a professional business product rather than a generic dashboard template.

## Target customers

- Freelancers
- Web developers
- UI/UX designers
- Consultants
- Small agencies
- Digital marketing agencies
- Small service-based businesses

## Commercial vision

ClientFlow should be designed with future commercialisation in mind.

Potential business models:

- Hosted SaaS subscriptions
- Free and paid subscription plans
- Agency plans
- Self-hosted deployments
- White-label versions
- Custom branding and customisation
- Commercial licences

Do not implement all commercial features immediately. Build an architecture that can support them without unnecessary complexity.

## Product principles

- Multi-tenancy from the beginning.
- Secure server-side authorisation.
- Reusable business components.
- Configurable workspace branding.
- Subscription-ready architecture.
- Reliable database relationships.
- Responsive and accessible UI.
- Server-first Next.js implementation.
- Maintainable TypeScript.
- No unnecessary abstractions.

---

# PART 3 — APPROVED DESIGN SYSTEM

The design system has already been decided and approved.

Do not introduce a different design language.

## Design personality

ClientFlow should be:

- Professional
- Modern
- Minimal
- Calm
- Trustworthy
- Efficient
- Premium
- Business-focused
- Easy to scan

Design inspiration: Linear, Stripe and modern B2B SaaS products.

These are references for design quality and usability, not templates to copy.

## What to avoid

- Excessive gradients
- Glassmorphism
- Neon colours
- Heavy shadows
- Huge rounded cards
- Overloaded dashboards
- Too many chart colours
- Large unnecessary illustrations
- Constant animations
- Generic AI-generated dashboard aesthetics
- Inconsistent spacing
- Random border radii
- Fake testimonials
- Fake customer logos
- Fake business statistics

## Light theme colours

| Token | Value |
|---|---|
| Background | #F8FAFC |
| Surface | #FFFFFF |
| Surface Secondary | #F1F5F9 |
| Border | #E2E8F0 |
| Text Primary | #0F172A |
| Text Secondary | #475569 |
| Text Muted | #64748B |
| Primary | #4F46E5 |
| Primary Hover | #4338CA |
| Success | #16A34A |
| Warning | #D97706 |
| Error | #DC2626 |
| Info | #2563EB |

## Dark theme colours

| Token | Value |
|---|---|
| Background | #0B1120 |
| Surface | #111827 |
| Surface Secondary | #1E293B |
| Border | #334155 |
| Text Primary | #F8FAFC |
| Text Secondary | #CBD5E1 |
| Text Muted | #94A3B8 |
| Primary | #818CF8 |
| Primary Hover | #A5B4FC |
| Success | #4ADE80 |
| Warning | #FBBF24 |
| Error | #F87171 |
| Info | #60A5FA |

These are the approved semantic design tokens. Existing CSS variables and Tailwind mappings should be inspected before modifying them.

## Typography

Primary font: Inter or equivalent.

| Style | Size |
|---|---|
| Display | 48–56px |
| H1 | 32–40px |
| H2 | 24–30px |
| H3 | 20–24px |
| Body Large | 16px |
| Body | 14px |
| Small | 13px |
| Caption | 12px |

Weights: 400, 500, 600 and 700.

## Layout

Application shell:

- Desktop sidebar: approximately 240–256px.
- Collapsed sidebar: approximately 64px.
- Header: 64px.
- Maximum page width: 1440px.
- Desktop padding: 32px.
- Laptop padding: 24px.
- Tablet padding: 20px.
- Mobile padding: 16px.

## Radius

- Small: 6px
- Medium: 8px
- Large: 12px
- Extra large: 16px
- Full: 9999px

Use subtle shadows only when needed.

## Buttons

Button variants:

- Primary
- Secondary
- Ghost
- Destructive

Heights:

- 32px
- 36px
- 40px

## UI principles

- Cards should be used intentionally, not around every element.
- Inputs need labels, helper text and validation states.
- Status badges should be subtle.
- Tables should adapt intelligently to mobile.
- Small operations can use dialogs.
- Complex workflows should use dedicated pages.
- Toasts are temporary feedback.
- Alerts are persistent page-level feedback.
- Skeletons should represent loading content.
- Empty states should explain what the user can do next.
- Errors should be understandable and actionable.

---

# PART 4 — RESPONSIVE DESIGN REQUIREMENTS

Every major feature must be tested at:

- 1440px
- 1280px
- 1024px
- 768px
- 375px
- 320px

Current approved application-shell behaviour:

| Screen | Behaviour |
|---|---|
| 1280px and above | Full sidebar with labels |
| 1024–1279px | Collapsed 64px sidebar with icons |
| Below 1024px | Mobile header and drawer |

The mobile drawer uses the existing shadcn Sheet component.

Requirements:

- No horizontal overflow.
- Touch-friendly controls.
- Responsive forms.
- Readable charts.
- Tables should become cards or use intentional horizontal scrolling.
- Dialogs should work on mobile.
- Navigation must remain usable.
- The mobile sidebar must show workspace branding and labels.

Do not change the approved application-shell behaviour without approval.

---

# PART 5 — TECHNOLOGY STACK

Current project stack:

| Area | Technology |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| UI | React |
| Styling | Tailwind CSS |
| UI components | shadcn/ui |
| Component primitives | Base UI |
| Icons | Lucide React |
| Database | PostgreSQL |
| ORM | Prisma 7.10.0 |
| Authentication | Auth.js / NextAuth v5 beta |
| Adapter | @auth/prisma-adapter |
| Password hashing | bcryptjs |
| Validation | Zod (imported in code but NOT listed in package.json — add it as a direct dependency) |
| Forms | React Hook Form (planned, not installed yet) |
| Charts | Recharts (planned, not installed yet) |
| Tables | TanStack Table, selectively (planned, not installed yet) |
| Testing | Vitest or Jest + React Testing Library, Playwright (planned, not installed yet) |
| Deployment | Vercel |
| Version control | Git and GitHub |
| Package manager | npm |

Important package-version notes:

- Current NextAuth version: 5.0.0-beta.32.
- Current Prisma CLI version: 7.10.0.
- Do not casually upgrade either dependency.
- Prisma 7 uses the project's current adapter/configuration setup.
- Inspect package.json before changing dependencies.
- Use the existing npm workflow.

---

# PART 6 — CURRENT PROJECT STRUCTURE

The following is the established project structure and naming convention.

Actual repository files take precedence over this reference. Inspect the filesystem before creating or renaming anything.

```text
client-flow/
│
├── .agents/
├── .claude/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── public/
│
├── generated/
│   └── prisma/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── application-shell.tsx
│   │   │   ├── Header-actions.tsx
│   │   │   ├── Mobile-sidebar.tsx
│   │   │   ├── page-container.tsx
│   │   │   ├── Sidebar-nav.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   └── ui/
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── command.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── popover.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── skeleton.tsx
│   │       ├── sonner.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   │
│   ├── lib/
│   │   ├── actions/
│   │   │   └── auth.ts
│   │   ├── db/
│   │   │   └── prisma.ts
│   │   ├── validation/
│   │   │   └── auth.ts
│   │   ├── utils.ts
│   │   └── workspace.ts
│   │
│   ├── types/
│   │   └── next-auth.d.ts
│   │
│   └── auth.ts
│
├── .env
├── .env.local
├── .env.example
├── prisma7.config.ts
├── components.json
├── package.json
└── tsconfig.json
```

This tree is a reference, not an instruction to recreate every entry. Verify the actual project before acting.

Some filenames use uppercase letters, for example `Sidebar.tsx` and `Header-actions.tsx`. Respect the actual casing in imports.

The validation folder is currently named `validation`, singular.

The layout folder is named `layouts`, plural.

Do not rename folders simply to match a convention you prefer.

---

# PART 7 — DATABASE AND PRISMA ARCHITECTURE

The project uses PostgreSQL and Prisma.

The database has already been installed locally and the initial migrations have been applied.

The Prisma Client is generated into the project's custom `generated/prisma` output directory.

The database connection uses the Prisma PostgreSQL adapter.

Current Prisma client setup is in:

`src/lib/db/prisma.ts`

Conceptually:

```text
Next.js
   ↓
Prisma Client
   ↓
Prisma PostgreSQL Adapter
   ↓
PostgreSQL
```

Prisma is not the database itself. PostgreSQL stores the data; Prisma provides the TypeScript-friendly database interface.

## Existing schema models

The existing schema contains:

- User
- Account
- Session
- VerificationToken
- Workspace
- WorkspaceMember
- Client
- Project
- Task
- Invoice
- InvoiceItem
- Notification
- Activity
- Invitation

Existing enums include:

- WorkspaceRole
- ClientStatus
- ProjectStatus
- TaskStatus
- TaskPriority
- InvoiceStatus
- NotificationType
- InvitationStatus

Do not replace the schema with a simplified schema.

Inspect the actual `prisma/schema.prisma` before making database changes.

## Important confirmed User model

```prisma
model User {
  id               String            @id @default(cuid())
  name             String?
  email            String            @unique
  emailVerified    DateTime?
  image            String?
  passwordHash     String?
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
  workspaceMembers WorkspaceMember[]
  accounts         Account[]
  sessions         Session[]
  assignedTasks    Task[]
  notifications    Notification[]
  activities      Activity[]
  sentInvitations  Invitation[]
}
```

## Important confirmed Workspace model

```prisma
model Workspace {
  id            String            @id @default(cuid())
  name          String
  slug          String            @unique
  logo          String?
  website       String?
  email         String?
  phone         String?
  address       String?
  currency      String            @default("INR")
  timezone      String            @default("Asia/Kolkata")
  brandColor    String?
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt
  members       WorkspaceMember[]
  clients       Client[]
  projects      Project[]
  tasks         Task[]
  invoices      Invoice[]
  notifications Notification[]
  activities    Activity[]
  invitations   Invitation[]
}
```

## Important confirmed WorkspaceMember model

```prisma
model WorkspaceMember {
  id          String        @id @default(cuid())
  userId      String
  workspaceId String
  role        WorkspaceRole @default(MEMBER)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  workspace Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@unique([userId, workspaceId])
  @@index([workspaceId])
  @@index([userId])
}
```

## WorkspaceRole

```prisma
enum WorkspaceRole {
  OWNER
  ADMIN
  MEMBER
}
```

## Critical ownership decision

The Workspace model does NOT have an `ownerId` field.

Workspace ownership is represented through:

`WorkspaceMember.role = OWNER`

Do not add a duplicate `ownerId` relationship without an explicit architectural reason.

## Database rules

- Use primary keys and foreign keys correctly.
- Use appropriate indexes.
- Use composite unique constraints where required.
- Use Decimal for financial amounts.
- Use appropriate delete behaviours.
- Preserve existing relations.
- Every business record must be scoped to a workspace.
- Invoice numbers must be unique per workspace.
- Use workspaceId indexes.
- Validate schema changes.
- Never silently discard existing data.
- Never reset the local database casually.

Important Prisma commands:

```bash
npx prisma format
npx prisma validate
npx prisma generate
npx prisma migrate dev --name descriptive_migration_name
npx prisma studio
```

Understand the difference:

- `format`: formats the schema.
- `validate`: checks the schema.
- `generate`: generates Prisma Client.
- `migrate dev`: applies schema changes through a migration.
- `studio`: opens a database browser.

Do not run destructive reset commands without explicit approval.

---

# PART 8 — MULTI-TENANCY AND SECURITY

This is one of the most important parts of ClientFlow.

The architecture must support multiple customers and multiple workspaces.

Conceptually:

```text
User
  ↓
WorkspaceMember
  ↓
Workspace
  ├── Clients
  ├── Projects
  ├── Tasks
  ├── Invoices
  ├── Notifications
  ├── Activities
  └── Invitations
```

A user may eventually belong to multiple workspaces.

The current MVP creates one workspace per newly registered user.

## Critical security rule

Never trust workspaceId, userId or role received from frontend form data when performing protected operations.

For every protected server-side operation:

1. Authenticate the user.
2. Obtain the user ID from the verified session.
3. Find their workspace membership.
4. Check the required permission.
5. Ensure the requested entity belongs to that workspace.
6. Perform the operation using workspace-scoped queries.

Incorrect:

```ts
const clients = await prisma.client.findMany();
```

Correct principle:

```ts
const clients = await prisma.client.findMany({
  where: {
    workspaceId: workspace.id,
  },
});
```

The same principle applies to:

- Create
- Read
- Update
- Delete
- Search
- Export
- Reports
- Background operations

Do not rely on hiding UI buttons as a security measure.

## Future roles

OWNER:
- Owns the workspace.
- Full workspace control.
- Manages billing and ownership.
- Manages team members.

ADMIN:
- Administrative operations.
- Manages clients, projects and team according to permissions.

MEMBER:
- Limited access.
- Works with assigned projects and tasks.

Implement actual permission checks later, based on a clear permission matrix.

A normal invitation must never allow a user to grant themselves OWNER status.

---

# PART 9 — AUTHENTICATION: CURRENT IMPLEMENTATION

Authentication has been implemented and tested.

Current technology:

- Auth.js / NextAuth v5 beta.
- Credentials provider.
- Prisma Adapter.
- bcryptjs.
- JWT sessions.

Important installed version:

`next-auth@5.0.0-beta.32`

## Registration flow

Current registration action:

`src/lib/actions/auth.ts`

It:

1. Validates input using Zod.
2. Checks whether the email already exists.
3. Hashes the password using bcryptjs with cost 12.
4. Creates the user.
5. Creates a workspace.
6. Creates a workspace membership with OWNER role.
7. Uses a Prisma transaction.

Conceptually:

```text
Registration
   ↓
Validate
   ↓
Hash password
   ↓
Create User
   ↓
Create Workspace
   ↓
Create WorkspaceMember (OWNER)
```

Workspace slug generation:

```ts
const workspaceSlug =
  `${createSlug(name)}-workspace-${newUser.id.slice(-8)}`;
```

Workspace name:

```ts
`${name}'s Workspace`
```

## Credentials login

Current login file:

`src/components/auth/login-form.tsx`

The form:

- Collects email and password.
- Calls `signIn("credentials", { redirect: false })`.
- Shows an error toast on failure.
- Shows a welcome toast on success.
- Navigates to `/dashboard`.
- Uses `router.refresh()`.

Do not change this working login flow casually.

## Current authentication configuration

`src/auth.ts`

Uses:

- `PrismaAdapter(prisma)`
- `session.strategy = "jwt"`
- Credentials provider
- `authorize()` finds the user and checks bcrypt password
- JWT callback stores `token.id`
- Session callback exposes `session.user.id`

The user ID is critical because workspace lookup depends on it.

## Session typing

Current augmentation is in:

`src/types/next-auth.d.ts`

It extends Session.user with `id` and JWT with `id`.

Do not remove it.

## Auth route

`src/app/api/auth/[...nextauth]/route.ts`

Uses:

```ts
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
```

## Protected dashboard layout

`src/app/(dashboard)/layout.tsx`

Uses:

```ts
import { auth } from "@/auth";
import { redirect } from "next/navigation";
```

It checks the session and redirects unauthenticated users to `/login`.

The dashboard page additionally requires a workspace.

## Existing authentication issues already solved

1. A v4/v5 NextAuth API mismatch caused undefined handlers.
2. Upgraded to NextAuth v5 beta.
3. Credentials login works.
4. Registration creates user/workspace/membership.
5. Login initially appeared successful but did not reach dashboard because the session did not expose the user ID.
6. Fixed by adding JWT and session callbacks.
7. Login now reaches the protected dashboard successfully.

Do not reintroduce these issues.

---

# PART 10 — CURRENT WORKSPACE IMPLEMENTATION

Current helper:

`src/lib/workspace.ts`

It contains two functions.

`getUserWorkspace(userId)`:
- Finds the user's workspace membership.
- Includes the related workspace.
- Returns the workspace or null.

`requireWorkspace()`:
- Calls `auth()`.
- Redirects to `/login` if there is no authenticated user ID.
- Finds the workspace membership.
- Includes the workspace.
- Throws an error if no membership exists.
- Returns user, workspace and role.

Current data flow:

```text
Login
  ↓
JWT
  ↓
session.user.id
  ↓
requireWorkspace()
  ↓
WorkspaceMember
  ↓
Workspace
  ↓
ApplicationShell
```

Important limitation:

`findFirst()` is currently acceptable for the MVP because registration creates one workspace per user.

It must not be treated as a complete multi-workspace selection strategy.

Later, implement an active workspace mechanism or another explicit selection strategy.

Do not assume `findFirst()` is the permanent answer for workspace switching.

## Application shell

The application shell receives:

- children
- user
- workspace

The workspace object passed to the shell currently includes:

- name
- slug
- logo

The desktop Sidebar and MobileSidebar receive the workspace.

The sidebar displays the dynamic workspace name and initials instead of the old hardcoded Rahul Digital Studio / RD placeholder.

The logo is available as workspace data, but full workspace logo rendering/branding is not yet implemented.

The user avatar and workspace identity are separate concepts:

```text
User
  ├── name
  └── email

Workspace
  ├── name
  ├── slug
  └── logo
```

## Current workspace state

Completed:
- User registration.
- Workspace creation.
- Workspace membership.
- OWNER role.
- Workspace slug.
- Workspace retrieval.
- Protected workspace access.
- Workspace passed to ApplicationShell.
- Workspace passed to Sidebar.
- Workspace passed to MobileSidebar.
- Dynamic workspace name.
- Dynamic workspace initials.
- Login/session integration.

Not yet implemented:
- Workspace switching.
- Creating additional workspaces.
- Workspace editing.
- Workspace logo upload.
- Workspace branding editor.
- Workspace invitations.
- Team management.
- Active workspace selection.
- Permission enforcement.

---

# PART 11 — CURRENT APPLICATION SHELL

The application shell has already been implemented and visually checked.

Files:

- `src/components/layouts/application-shell.tsx`
- `src/components/layouts/Sidebar.tsx`
- `src/components/layouts/Sidebar-nav.tsx`
- `src/components/layouts/Header-actions.tsx`
- `src/components/layouts/Mobile-sidebar.tsx`
- `src/components/layouts/page-container.tsx`

Actual filenames and import casing must be checked in the repository.

## Sidebar navigation

Primary navigation:

1. Dashboard
2. Clients
3. Projects
4. Tasks
5. Invoices
6. Calendar
7. Team
8. Reports

Secondary navigation:

1. Settings
2. Help & Support

## Header

Current header includes:

- Search icon.
- Notifications icon.
- Quick Create button.
- User avatar.
- User dropdown.

## User dropdown

Uses the existing shadcn dropdown-menu component.

Current menu concept:

- User name.
- Email.
- Profile.
- Sign out.

Profile is currently a placeholder; full profile settings are not implemented.

Sign out uses NextAuth's client signOut.

## Important shadcn rule

The project uses shadcn/ui with Base UI primitives.

Existing downloaded UI files must be preserved.

For example:

- dropdown-menu.tsx
- sheet.tsx
- button.tsx
- avatar.tsx
- dialog.tsx
- input.tsx
- card.tsx
- badge.tsx
- sonner.tsx
- tooltip.tsx

Do not replace these with custom components.

An earlier dropdown runtime error occurred because MenuPrimitive.GroupLabel was used without its required Menu.Group context. The problem was corrected in application-level usage.

The lesson: use the installed shadcn components according to their API. Do not casually rewrite their implementation.

---

# PART 12 — EXISTING UI FOUNDATION

The following shadcn/Base UI components have already been installed or implemented:

1. Button
2. Card
3. Separator
4. Badge
5. Input
6. Textarea
7. Label
8. Input Group (note: `select.tsx` is NOT installed yet; add it with the shadcn CLI when a feature needs it)
9. Checkbox
10. Dialog
11. Popover
12. Skeleton
13. Sonner / Toaster
14. Tooltip
15. Table
16. Tabs
17. Command
18. Calendar
19. Avatar
20. Alert
21. Sheet
22. Dropdown Menu

The user wants to reuse these components.

Use the existing components before installing anything new.

## UI foundation concepts already established

- Skeleton = loading placeholder.
- Dialog = small operations.
- Page = complex workflows.
- Table = responsive data display.
- Tooltip = useful in collapsed sidebar.
- Toast = temporary feedback.
- Alert = persistent information.
- Tabs = related content, not unrelated workflows.
- Cards should not surround everything.

---

# PART 13 — DASHBOARD REQUIREMENTS

The dashboard is not fully implemented yet.

Current dashboard only contains:

- Dashboard label.
- Welcome to ClientFlow heading.
- Workspace-aware introductory text.

The actual dashboard design board is approved and should be consulted before building.

## Required KPI cards

- Total Clients
- Active Projects
- Pending Tasks
- Total Revenue

Each KPI should eventually include:

- Current value.
- Previous-period comparison.
- Percentage change.
- Trend indicator.

Do not fabricate values. Empty or zero states should be handled honestly.

## Charts

- Revenue overview.
- Project status distribution.
- Task completion.
- Monthly business activity.

Use Recharts with restrained colours.

## Dashboard sections

- Recent Projects.
- Upcoming Tasks.
- Recent Activity.
- Recent Invoices.
- Revenue Summary.

## Requirements

- Workspace-scoped queries.
- Appropriate loading skeletons.
- Error states.
- Empty states.
- Responsive charts.
- No fake statistics.
- No cross-workspace data.
- Efficient database queries.

Do not create arbitrary dashboard data merely to make the interface look populated.

---

# PART 14 — COMPLETE PRODUCT FEATURE REQUIREMENTS

## A. Clients

Client list:

- Name.
- Company.
- Email.
- Phone.
- Projects.
- Status.
- Created date.
- Actions.

Features:

- Create client.
- View client.
- Edit client.
- Delete client.
- Search.
- Filter.
- Sort.
- Pagination.

Client detail:

- Client information.
- Projects.
- Tasks.
- Invoices.
- Payments.
- Activity.

## B. Projects

Project list:

- Project name.
- Client.
- Status.
- Progress.
- Start date.
- Deadline.
- Budget.
- Actions.

Project statuses:

- Planning
- In Progress
- Review
- Completed
- On Hold
- Cancelled

Project detail:

- Overview.
- Description.
- Client.
- Budget.
- Dates.
- Status.
- Progress.
- Tasks.
- Team.
- Activity.
- Files.

## C. Tasks

Features:

- Create task.
- Edit task.
- Delete task.
- Assign task.
- Set due date.
- Set priority.
- Associate with project.
- Associate with client where appropriate.

Statuses:

- Todo
- In Progress
- Review
- Completed

Priorities:

- Low
- Medium
- High
- Urgent

Views:

- Table/list.
- Kanban.

Filters:

- Search.
- Assignee.
- Project.
- Priority.
- Status.
- Due date.

## D. Invoices

Invoice list:

- Invoice number.
- Client.
- Amount.
- Issue date.
- Due date.
- Status.
- Actions.

Statuses:

- Draft
- Sent
- Paid
- Pending
- Overdue
- Cancelled

Invoice creation:

- Client.
- Project.
- Invoice number.
- Issue date.
- Due date.
- Line items.
- Quantity.
- Unit price.
- Tax.
- Discount.
- Notes.

Calculations:

- Subtotal.
- Tax.
- Discount.
- Total.

Additional requirements:

- Invoice detail.
- Print.
- PDF.
- Future workspace branding.
- Payment tracking.

Invoice numbers must be unique per workspace.

Use Decimal for money, not floating-point arithmetic for financial calculations.

## E. Calendar

Support:

- Month view.
- Week view.
- Day view.

Events:

- Task deadlines.
- Project deadlines.
- Meetings.
- Invoice due dates.

Clicking an event should open its related entity.

## F. Team and invitations

Owner/Admin capabilities:

- View team.
- Invite member.
- Change eligible roles.
- Remove members.
- Assign projects.
- Assign tasks.

Invitation lifecycle:

- Create invitation.
- Send invitation.
- Expire invitation.
- Accept invitation.
- Reject or revoke invitation.

Enforce role permissions on the server.

## G. Notifications

- Notification center.
- Notification types.
- Read/unread.
- Mark as read.
- Mark all as read.
- Unread count.

## H. Global search

Search across:

- Clients.
- Projects.
- Tasks.
- Invoices.

Use a command-style interface where appropriate.

## I. Settings

- User profile.
- Workspace profile.
- Notifications.
- Security.
- Appearance.

Workspace settings:

- Name.
- Logo.
- Website.
- Email.
- Phone.
- Address.
- Currency.
- Timezone.
- Branding.

## J. Reports

Business analytics:

- Revenue.
- Project performance.
- Client performance.
- Task completion.
- Invoice performance.

All data must be workspace-scoped.

---

# PART 15 — MARKETING WEBSITE

Public routes:

- /
- /features
- /pricing
- /about
- /contact
- /faq

Landing page sections:

1. Navbar
2. Hero
3. Product preview
4. Features
5. How it works
6. Benefits
7. Testimonials, only when genuine
8. Pricing
9. FAQ
10. CTA
11. Footer

Important:

Do not publish fake testimonials, customer counts, case studies, logos or performance claims.

Pricing should support future FREE, PRO and AGENCY tiers, but billing is not part of the immediate implementation.

---

# PART 16 — DEMO MODE

Future requirement:

Provide a Try Interactive Demo experience.

Demo must:

- Use an isolated demo workspace.
- Use believable fictional sample data.
- Never expose real user information.
- Avoid modifying actual user workspaces.
- Clearly indicate demo mode.

Example fictional data:

Workspace:
Rahul Digital Studio

Clients:
- Acme Corp
- TechStart
- Bright Media
- GreenLeaf

Projects:
- E-commerce Website
- Mobile UI
- Landing Page
- Admin Dashboard

These are sample-data examples, not actual customer claims.

---

# PART 17 — COMMERCIALISATION AND FUTURE ARCHITECTURE

ClientFlow must eventually support:

## Subscription-ready architecture

Possible plans:

- FREE
- PRO
- AGENCY

Use central plan and feature configuration.

Do not scatter hardcoded usage limits across the application.

Future models may include:

- Subscription
- Payment
- AuditLog
- ApiKey

These are future additions and should not be introduced without a clear need.

## White-label readiness

Do not hardcode ClientFlow branding into every business component.

Support workspace-level:

- Name.
- Logo.
- Brand colour.

Business UI should eventually read workspace branding from configuration.

## Self-hosted readiness

Keep configuration clear.

Avoid unnecessary dependence on proprietary features that make self-hosting impossible.

---

# PART 18 — SECURITY REQUIREMENTS

Security is not optional.

Requirements:

- Server-side authentication.
- Server-side workspace authorisation.
- Role-based permissions.
- Zod validation.
- Secure session handling.
- Secure password hashing.
- Safe error messages.
- Rate limiting on sensitive endpoints.
- CSRF protection where applicable.
- Secrets in environment variables.
- No secrets in Git.
- Audit logging where appropriate.
- Proper ownership checks.
- No insecure cross-workspace queries.
- No trusting client-provided IDs or roles.

For every create/update/delete operation, validate both input and workspace access.

Never reveal whether another user's private data exists through error messages.

---

# PART 19 — PERFORMANCE

Requirements:

- Prefer Server Components.
- Use Client Components only when interactivity requires them.
- Minimise unnecessary client-side JavaScript.
- Use efficient Prisma queries.
- Use indexes appropriately.
- Avoid unnecessary re-renders.
- Use dynamic imports where useful.
- Optimise images.
- Use loading.tsx and Suspense where appropriate.
- Avoid fetching all records unnecessarily.
- Implement pagination for large datasets.

Explain why a component needs `"use client"` rather than adding it everywhere.

---

# PART 20 — ACCESSIBILITY

Requirements:

- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Accessible dialogs.
- Correct labels.
- ARIA only where necessary.
- Good contrast.
- Screen-reader-friendly status messages.
- Keyboard-operable menus.
- Touch-friendly controls.

---

# PART 21 — SEO

Public pages should support:

- Metadata title.
- Description.
- Open Graph.
- Twitter cards.
- Canonical URLs.
- Sitemap.
- Robots.
- Structured data where appropriate.

The dashboard and authenticated routes must not be publicly indexed.

The existing metadata currently uses a placeholder domain:

`https://clientflow.example.com`

Replace it only when the real production domain is confirmed.

Do not invent a production URL.

---

# PART 22 — DEVELOPMENT ROADMAP

The original development sequence is:

| Phase | Work |
|---|---|
| 0 | Planning |
| 1 | Design system |
| 2 | Project setup |
| 3 | Database and Prisma |
| 4 | Authentication |
| 5 | Workspace and authorisation |
| 6 | Dashboard |
| 7 | Clients |
| 8 | Projects |
| 9 | Tasks |
| 10 | Invoices |
| 11 | Calendar |
| 12 | Team and invitations |
| 13 | Notifications |
| 14 | Settings |
| 15 | Marketing website |
| 16 | Demo mode |
| 17 | Security |
| 18 | Performance |
| 19 | Accessibility |
| 20 | SEO |
| 21 | Testing |
| 22 | Deployment |
| 23 | Commercial readiness |

Some implementation tasks have overlapped. Use the actual codebase to establish the precise current status rather than assuming every earlier phase is fully complete.

---

# PART 23 — VISUAL DESIGN REFERENCE BOARDS

Twelve visual design boards were previously generated and approved.

They are the source of truth for screen appearance.

1. Application Shell
2. Dashboard
3. Clients
4. Projects
5. Tasks
6. Invoices
7. Calendar + Notifications
8. Team + Invitations
9. Settings
10. Authentication + Onboarding
11. Marketing Website
12. System States + Dark Mode + Responsive

The boards cover:

- Desktop layouts.
- Responsive behaviour.
- Mobile layouts.
- Light and dark mode.
- Empty states.
- Loading states.
- Error states.
- Navigation.
- Component styling.
- Page hierarchy.

Important:

The Marketing Website board may contain placeholder-looking testimonials, claims, prices or sample data. Do not treat those as verified product facts.

The boards are stored in `docs/design/`, named by board number (for example `01-app-shell-dashboard.png`, `03-clients.png`, `12-system-states.png`). There is no separate board 02: the dashboard design is in board 01. Inspect the relevant board before building a feature.

If they are not available, ask the developer to provide them. Do not pretend to have seen the images.

The approved design system and written requirements remain authoritative.

---

# PART 24 — TESTING AND QUALITY REQUIREMENTS

Every feature must support:

1. Loading.
2. Success.
3. Empty.
4. Error.
5. Validation.
6. Responsive behaviour.
7. Permission handling.
8. Workspace isolation.

Before marking a task complete, verify:

- npm run lint
- npx tsc --noEmit
- npm run build

Use whichever checks are defined by the actual package.json.

Also test the relevant user flow in the browser.

## Automated tests (required)

Rahul comes from a QA background, and tested code is his main advantage in interviews.

Every feature includes:

- Unit and component tests with Vitest or Jest + React Testing Library (forms, validation, components, server actions).
- Playwright end-to-end tests for main flows: register, login, create client, create project, create task.
- A workspace isolation test: a user in workspace A cannot read, edit or delete records from workspace B.
- Tests run in GitHub Actions on every push (set up once the first tests exist).

A feature is not complete until its tests pass.

Do not claim a feature works just because the code compiles.

---

# PART 25 — CURRENT IMPLEMENTATION STATUS

This section describes the last verified development state.

## Completed and working

### Project setup

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui with Base UI.
- PostgreSQL.
- Prisma.
- Auth.js.
- Existing UI foundation.
- Application shell.

### Database

- PostgreSQL installed locally.
- Database created.
- Initial migrations applied.
- Authentication fields migrated.
- Prisma Client generated.
- Prisma connection tested.
- Prisma Studio used to verify records.

### Authentication

- Registration page.
- Registration validation.
- Password hashing.
- User creation.
- Workspace creation.
- Workspace membership creation.
- OWNER assignment.
- Credentials login.
- JWT session.
- Session user ID.
- Logout.
- Login and registration toasts.
- Protected dashboard.

### Workspace foundation

- Workspace model.
- WorkspaceMember model.
- WorkspaceRole.
- Workspace slug.
- getUserWorkspace().
- requireWorkspace().
- Authenticated workspace retrieval.
- Workspace passed to ApplicationShell.
- Workspace passed to desktop Sidebar.
- Workspace passed to MobileSidebar.
- Dynamic workspace name.
- Dynamic workspace initials.

### Application shell

- Desktop sidebar.
- Collapsed sidebar.
- Mobile drawer.
- Header.
- Search icon.
- Notifications icon.
- Quick Create button.
- User avatar.
- User dropdown.
- Profile placeholder.
- Sign out.

### UI foundation

Existing shadcn components have been installed and verified.

### Dashboard

The current dashboard is still a simple welcome screen.

It displays:

- Dashboard label.
- Welcome to ClientFlow.
- Workspace-aware introductory text.

The complete KPI/chart/activity dashboard has not yet been implemented.

## Current known limitations

- No actual dashboard analytics.
- No client CRUD.
- No project CRUD.
- No task CRUD.
- No invoice CRUD.
- No payment integration.
- No team invitations.
- No notification backend.
- No workspace switching.
- No workspace editing UI.
- No role permission matrix.
- No full profile/settings functionality.
- No marketing pages beyond existing setup.
- No demo mode.
- No subscription billing.
- No production deployment.

Do not mark these as complete.

---

# PART 26 — KNOWN ISSUES AND LESSONS

The following issues have already been encountered and solved.

### 1. NextAuth version mismatch

Earlier v4 code was incompatible with the v5 handler API.

Current version is v5 beta.32.

Do not downgrade or mix v4 and v5 patterns.

### 2. Session user ID missing

Credentials authentication initially succeeded, but `session.user.id` was missing.

Solved using JWT and session callbacks plus TypeScript module augmentation.

Do not remove these callbacks.

### 3. Dashboard login redirect loop

The login form showed the success toast but did not remain on the dashboard.

This was resolved by ensuring the JWT and session callbacks preserve the user ID.

The workspace helper now relies on `session.user.id`.

### 4. shadcn Base UI Dropdown Menu context

A runtime error occurred because MenuPrimitive.GroupLabel was used outside Menu.Group.

The application-level dropdown usage was corrected.

Do not rewrite the shadcn component to work around incorrect usage.

### 5. Next.js smooth scrolling warning

A development warning appeared because smooth scrolling was globally configured on the html element.

This was discussed; inspect the current globals.css before making changes.

### 6. Prisma 7 configuration

Prisma 7 uses the current adapter and configuration setup.

Do not replace the project setup with an outdated Prisma 5/6 example.

### 7. Workspace owner representation

Workspace does not contain ownerId.

Owner is represented by WorkspaceMember.role.

Do not introduce an ownerId field casually.

---

# PART 27 — IMPORTANT IMPLEMENTATION DECISIONS

Keep these decisions consistent.

1. ClientFlow is a multi-tenant SaaS.
2. Workspace is the tenant boundary.
3. User and workspace are separate concepts.
4. Workspace membership determines access.
5. OWNER is represented by WorkspaceMember.role.
6. Every business record must be workspace-scoped.
7. Server-side permission checks are mandatory.
8. Existing shadcn UI components should be reused.
9. Existing design tokens must be preserved.
10. Server Components are preferred.
11. Client Components are only used where needed.
12. Prisma is used through the existing adapter setup.
13. Auth.js v5 beta is currently installed.
14. Financial values use Decimal.
15. No fake statistics or testimonials.
16. The design system is approved and should not be redesigned.
17. Build feature by feature.
18. Test before moving to the next feature.
19. Explain important concepts to the developer.
20. Preserve existing working code.

---

# PART 28 — FIRST TASK FOR CLAUDE CODE

Do NOT immediately start building the dashboard.

First perform a repository audit.

## Audit checklist

Inspect:

- package.json
- tsconfig.json
- components.json
- globals.css
- root layout
- auth.ts
- NextAuth type augmentation
- registration action
- registration validation
- login form
- register form
- Prisma client setup
- Prisma configuration
- Prisma schema
- migration history
- workspace helper
- dashboard protected layout
- dashboard page
- ApplicationShell
- Sidebar
- SidebarNav
- MobileSidebar
- HeaderActions
- PageContainer
- shadcn UI components
- Git status and current branch

Verify:

1. Is the application compiling?
2. Does registration work?
3. Does login work?
4. Does logout work?
5. Does session.user.id exist?
6. Does requireWorkspace() return the expected data?
7. Does a new user receive a workspace?
8. Is OWNER assigned correctly?
9. Does the desktop sidebar display the workspace name?
10. Does the mobile sidebar receive the workspace?
11. Are all business queries workspace-scoped?
12. Are environment variables excluded from Git?
13. Are the current design tokens intact?
14. Are the approved design reference images available?

Do not assume all checks pass. Test them.

## Deliver an audit report

Use these headings:

- Existing Architecture
- Current Folder Structure
- Installed Technology Versions
- Authentication Status
- Database Status
- Workspace Status
- UI and Design System Status
- Responsive Status
- Security Concerns
- Missing Features
- Inconsistencies
- Recommended Next Step

Clearly distinguish:

- Verified working.
- Present but untested.
- Partially implemented.
- Missing.
- Needs correction.

Do not change files during this audit.

## After the audit

Wait for Rahul's approval.

The next intended development feature is **Clients**, based on the approved Clients visual board (`docs/design/03-clients.png`) and the existing design system. See Part 1B for the build order.

Before Clients, fix these small setup issues (one at a time, with approval):

1. Add `zod` as a direct dependency.
2. Allow `.env.example` in `.gitignore` (add `!.env.example`) and create `.env.example` with placeholder values only.
3. Confirm the Prisma config file name works with the Prisma CLI (`prisma7.config.ts`).

Implement Clients incrementally:

1. Review the approved Clients board.
2. Clients list page at `/clients`: workspace-scoped server query, table on desktop, cards on mobile.
3. Empty state, loading skeleton and error state.
4. Create client (dialog) with Zod validation and a server action that takes `workspaceId` from `requireWorkspace()`, never from the form.
5. Edit and delete (with confirmation dialog).
6. Search, then filter and sort.
7. Client detail page.
8. Tests: component tests, a Playwright flow, and a workspace isolation test.
9. Test responsiveness at the required widths.

Do not fabricate data.

---

# FINAL MESSAGE TO CLAUDE CODE

You are working on an existing SaaS product with an established product vision, architecture, database, authentication system, workspace model, UI component library and approved visual design system.

Your goal is to continue development responsibly.

Do not optimise for generating the largest amount of code.

Optimise for:

- Correct architecture.
- Security.
- Data isolation.
- Design consistency.
- Maintainability.
- Performance.
- Accessibility.
- Commercial readiness.
- Developer understanding.

Always inspect before modifying.

Always explain before implementing.

Always preserve approved decisions unless Rahul explicitly asks to change them.

The developer is learning while building, so explain what you are doing and why.

**First action: inspect the repository and deliver the audit report. Do not modify any files until the audit has been reviewed and approved.**
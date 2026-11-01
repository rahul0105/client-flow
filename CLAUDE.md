@AGENTS.md

# ClientFlow

Multi-tenant SaaS for freelancers and agencies: clients, projects, tasks, invoices.
Developer: Rahul Chourasia (learning while building, preparing for frontend interviews).

**Full brief:** `docs/PROJECT_BRIEF.md`. Read it before starting any new feature.
**Design boards:** `docs/design/`. Inspect the relevant board before building a screen.

## Current priority

MVP by Dec 13, 2026. Build order: Clients → Projects → Tasks → Dashboard → Invoices.
Do not start deferred features (calendar, team, notifications, marketing, billing) unless asked.

## Workflow

1. Inspect the relevant files before changing anything. Never assume names or paths.
2. Explain the plan simply and list the files you will change. Wait for approval.
3. Learning mode: let Rahul write the first version of one file, then review it.
4. Make one focused change at a time.
5. Run `npm run lint`, `npx tsc --noEmit`, `npm run build`, and the tests. Report results.
6. Wait for approval before the next step.

## Non-negotiable rules

- Every business query is scoped to the workspace from `requireWorkspace()`. Never trust `workspaceId`, `userId` or role from the client.
- Do not modify files in `src/components/ui/` (shadcn/Base UI). Use their APIs correctly.
- Do not change working auth (`src/auth.ts`, JWT/session callbacks, `src/types/next-auth.d.ts`).
- Do not upgrade next-auth (5.0.0-beta.32) or Prisma (7.10.0). Use the existing adapter setup in `src/lib/db/prisma.ts`.
- Owner = `WorkspaceMember.role = OWNER`. Do not add `ownerId` to Workspace.
- Money uses Prisma `Decimal`, never floats.
- Never run `prisma migrate reset` or other destructive commands without approval.
- Never read, print or commit secrets from `.env` files.
- No fake statistics, testimonials or data in the product UI.
- Respect existing file name casing (`Sidebar.tsx`, `Header-actions.tsx`), `lib/validation/` (singular), `components/layouts/` (plural).
- Prefer Server Components; explain every `"use client"`.
- Every feature ships with loading, empty, error and validation states, and tests.

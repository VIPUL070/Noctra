# Next.js Starter

A production-oriented full-stack starter.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS 4 ·
Prisma 6 + PostgreSQL · Zod · ESLint 9 (flat config) · Prettier · Vitest · Docker · GitHub Actions

Requires Node.js 20.9+ (22 recommended, see `.nvmrc`).

## Quick start

```bash
npm install
cp .env.example .env
docker compose up -d db          # local PostgreSQL
npx prisma migrate dev --name init
npm run dev                      # http://localhost:3000
```

Then run `npm run format` once to normalize formatting, and `git init && git add . && git commit`.

## Scripts

| Script                                 | What it does                          |
| -------------------------------------- | ------------------------------------- |
| `npm run dev` / `build` / `start`      | Next.js dev, production build, serve  |
| `npm run lint` / `typecheck` / `test`  | ESLint, `tsc --noEmit`, Vitest        |
| `npm run format` / `format:check`      | Prettier                              |
| `npm run db:migrate` / `db:deploy`     | Create (dev) / apply (prod) migrations |
| `npm run db:studio`                    | Prisma Studio                         |

## Layout

```prisma/schema.prisma        Data model (example: Task)
src/app/                    Routes, layouts, error/not-found, robots
src/app/tasks/              Example feature: server actions + client form
src/app/api/health          Health check (used by Docker HEALTHCHECK)
src/app/api/tasks           Example REST route with Zod validation
src/lib/db.ts               Prisma singleton
src/lib/env.ts              Zod-validated environment (call getEnv() in server code)
src/lib/validators.ts       Shared Zod schemas (+ tests)
```

## Production

- `next.config.ts` sets `output: "standalone"` and baseline security headers.
- `docker build -t app .` builds a small non-root image. Run migrations against your production
  database with `npx prisma migrate deploy` (e.g. as a release step in CI/CD), not at container start.
- CI (`.github/workflows/ci.yml`) runs lint, typecheck, tests and build on every push/PR.

## Deliberately left out (add what you need)

- **Authentication** — Clerk, Auth.js or Better Auth; protect routes with `proxy.ts` (Next 16's
  replacement for `middleware.ts`) plus server-side checks in actions/routes.
- **Content-Security-Policy** — needs nonces tuned to your scripts/third parties.
- **Rate limiting, logging/observability (Sentry, OpenTelemetry), E2E tests (Playwright).**

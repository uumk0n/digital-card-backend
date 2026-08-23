# CLAUDE.md

Context for Claude Code when working in this repository.

## What this is

Backend for Ilya Konyaev's digital business card: a NestJS + GraphQL API
backed by PostgreSQL via Prisma, served from a Docker container. It exposes
a single `profile` query returning identity, skills, and work experience.

## Commands

- `npm run start:dev` — local dev server with watch mode (`/graphql` for the playground)
- `npm run build` — compile TypeScript
- `npm run prisma:generate` — regenerate the Prisma client after a schema change
- `npm run prisma:migrate` — apply migrations (production/CI)
- `npx prisma migrate dev --name <name>` — create a new migration locally
- `npm run prisma:seed` — (re)seed the profile data
- `docker compose up --build` — run Postgres + API together

## Conventions

- Code-first GraphQL: types live in `src/**/models/*.model.ts`, resolvers next
  to their feature module. The schema is generated to `src/schema.gql` — don't
  edit it by hand.
- One feature = one Nest module (`profile/`). `PrismaModule` is `@Global()` so
  `PrismaService` is injectable anywhere without re-importing it.
- Keep resolvers thin; business/data-access logic goes in the `*.service.ts`.
- Content changes (CV data) go through `prisma/seed.ts`, not hardcoded in resolvers.

## Deployment

Deployed as a Docker image to Railway (or Render), with a managed Postgres
add-on. `DATABASE_URL` and `CORS_ORIGIN` (comma-separated allowed origins,
including the Vercel frontend URL) are supplied as environment variables on
the host — see `.env.example`.

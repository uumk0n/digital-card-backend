# Backend — Digital Business Card API

NestJS + GraphQL (code-first) + Prisma/PostgreSQL, dockerized. Exposes a
single `profile` query returning identity, skills, and work experience.

```
backend/
├── src/
│   ├── main.ts              bootstrap, CORS
│   ├── app.module.ts        wires GraphQL + Prisma + feature modules
│   ├── prisma/               PrismaService/PrismaModule (@Global)
│   └── profile/
│       ├── models/           GraphQL object types (Profile, Skill, Experience)
│       ├── profile.service.ts
│       ├── profile.resolver.ts
│       └── profile.module.ts
├── prisma/
│   ├── schema.prisma          data model
│   └── seed.ts                CV content, loaded into the DB
├── Dockerfile                 multi-stage build
├── docker-compose.yml         Postgres + API for local/prod-like runs
└── CLAUDE.md                  project notes for Claude Code
```

## Run with Docker (recommended)

```bash
cp .env.example .env
docker compose up --build
```

Serves at `http://localhost:4000/graphql`. On container start it runs
`prisma migrate deploy` automatically; run the seed once separately:

```bash
docker compose exec api npm run prisma:seed
```

## Run without Docker

Needs a local PostgreSQL instance and `DATABASE_URL` set (see `.env.example`).

```bash
npm install
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

## Scripts

| Command                  | What it does                                    |
|---------------------------|--------------------------------------------------|
| `npm run start:dev`       | Dev server, watch mode                          |
| `npm run build`           | Compile TypeScript to `dist/`                   |
| `npm run prisma:generate` | Regenerate Prisma client after a schema change  |
| `npm run prisma:migrate`  | Apply migrations (prod/CI — non-interactive)    |
| `npx prisma migrate dev`  | Create + apply a new migration locally          |
| `npm run prisma:seed`     | (Re)seed the profile data from `prisma/seed.ts` |

## Environment variables

See `.env.example`:

- `DATABASE_URL` — Postgres connection string
- `PORT` — defaults to 4000
- `CORS_ORIGIN` — comma-separated list of allowed origins (the Vercel
  frontend URL goes here)

## Deploy

Ships as a Docker image → **Railway** (or Render): connect the repo, point
the service at this `backend/` directory, it builds `Dockerfile` directly.
Add a managed Postgres, wire its connection string into `DATABASE_URL`, set
`CORS_ORIGIN` to the deployed frontend's URL.

## Editing content

CV data (name, contacts, skills, experience) lives in `prisma/seed.ts`, not
hardcoded in resolvers — change it there and re-run `npm run prisma:seed`.

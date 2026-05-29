# SCAR Platform

SCAR is a role-based travel architecture for shared macro-logistics and decentralized micro-experiences.

## Apps

- `/customer` - Customer Canvas App
- `/guides` - Local Guide Switchboard
- `/drivers` - Logistics Driver Engine
- `/vendors` - Local Field Asset Registry Hub
- `/admin` - Admin Ledger Dashboard

## Local Setup

```bash
corepack enable # if available on your machine
npx pnpm@10.12.1 install
cp .env.example .env
cp packages/db/.env.example packages/db/.env
npx pnpm@10.12.1 db:generate
npx pnpm@10.12.1 dev
```

The first scaffold is intentionally provider-light: PostgreSQL/Prisma are wired for production data modeling, while live maps, payment processing, and official road-condition feeds remain integration boundaries.

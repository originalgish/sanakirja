# Finnish-English vocabulary cards app

## Setup

Requirements:

- Node.js
- PNPM, [installation](https://pnpm.io/installation)

Install dependencies with

```
pnpm install
```

## Build

Build all to pass shared data across packages.

```
pnpm build
```

## Backend `.env` file

Add `.env` file to `packages/backend` with following structure:

```
MONGODB_URL=""
NOTION_API_KEY=""
JWT_SECRET=""
```

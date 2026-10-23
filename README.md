# BOU Acadex

Bangladesh Open University student academic hub — a single Next.js app (React
frontend + serverless API route handlers) deployed as one process.

## Structure

```
src/
  app/
    layout.tsx               Root layout (Bengali lang, metadata, global CSS, theme init)
    page.tsx                 Home
    books/page.tsx           E-Books
    questions/page.tsx       Old Questions & Answers
    mcq-test/page.tsx        MCQ Mock Test
    api-docs/page.tsx        API reference
    api/                     Route handlers / serverless functions (books, questions, notices, mcq)
  components/
    layout/                  Top notice bar, header (theme + mobile nav), footer, page shell
    ui/                      Toast provider, modal
    home/                    Hero, stats, features, schools, mini quiz, notices
    books/                   Book catalogue, cards, reader modal
    questions/               Question paper archive, solution panels
    mcq/                     Exam engine (timer, palette, grading, results)
  data/                      JSON datasets imported by the API routes
  lib/                       API client, formatting helpers, HTTP/response helpers
  styles/                    Global stylesheets (imported by the root layout)
  types/                     Shared TypeScript types

public/
  assets/                    Logo, favicon, images
```

The frontend is built with React (Next.js App Router) and calls the same-origin
API (`/api`) from client components. The API routes are deployed as serverless
functions by Vercel.

## Development

One process, one port:

```
npm install
npm run dev
```

Site: http://localhost:3000 — API: http://localhost:3000/api

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start unified dev server on port 3000 (serves static at `/` and Next.js at `/beta`) |
| `npm run build` | Builds static site and Next.js serverless app |
| `npm run start` | Serve production build on port 3000 |
| `npm run lint` | ESLint (next/core-web-vitals) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build:static` | Regenerate the `static/` site |

## Architecture: Dual-Tier Production & Serverless Vercel Deployment

1. **Root Domain (`/`, `/books`, `/mcq-test`, `/questions`, `/program/...`):**
   Serves the ultra-lightweight, zero-overhead static web application built with HTML5, Vanilla CSS3 design tokens, and modular Vanilla JavaScript (`site.js`).
2. **Beta Subpath (`/beta`, `/beta/books`, `/beta/mcq-test`, etc.):**
   Serves the Next.js 14 App Router application (React 18, TypeScript 5, interactive PDF reader, timed MCQ testing arena, and serverless API endpoints).
3. **Serverless on Vercel:**
   The entire application runs serverless on Vercel without requiring background proxy processes:
   - Root domain and static pages are served with 0ms cold starts.
   - `/beta` and API endpoints run as Next.js serverless functions.

## API

| Endpoint | Description |
| --- | --- |
| `GET /api/books` (or `/beta/api/books`) | E-books (`school`, `program`, `level`, `q`) |
| `GET /api/questions` (or `/beta/api/questions`) | Past papers (`year`, `program`, `school`, `semester`, `q`) |
| `GET /api/notices` (or `/beta/api/notices`) | Notices |
| `GET /api/mcq` (or `/beta/api/mcq`) | MCQ subject list |
| `GET /api/mcq?subject=ict` | Full MCQ bank |
| `POST /api/mcq` | Auto-evaluate `{ subject, answers }` |

A human-readable version lives at `/api-docs` and `/beta/api-docs`.

## Deploy (Vercel)

Import the repository as-is. Vercel detects Next.js automatically and deploys both the static site at the root domain and the Next.js App Router application at `/beta` alongside serverless API functions.

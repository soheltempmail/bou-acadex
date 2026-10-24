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
    program/[subject]/       Study programme (overview, read, mcq, written)
    api-docs/page.tsx        API reference
    about|terms|privacy|disclaimer/   Legal pages
    api/                     Route handlers / serverless functions (books, questions, notices, mcq)
    pdfjs/[...path]/         Serves PDF.js cmaps and standard fonts
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
  books/                     PDF course material served to the reader
  pdfjs/                     PDF.js cmaps and standard fonts
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
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build (`next build`) |
| `npm run start` | Serve production build on port 3000 |
| `npm run lint` | ESLint (next/core-web-vitals) |
| `npm run typecheck` | `tsc --noEmit` |

## Architecture: Serverless on Vercel

The whole site is one Next.js 14 App Router application served from the domain
root:

- **Pages** (`/`, `/books`, `/questions`, `/mcq-test`, `/program/...`) render
  as Next.js routes — static where possible, streamed where not.
- **API** (`/api/*`) deploys as serverless functions.
- **PDF.js assets** (`/pdfjs/*`, `/pdf.worker.min.mjs`) are traced into the
  serverless bundles by `outputFileTracingIncludes` in `next.config.mjs`.

There is no separate static site and no reverse proxy — no `/beta` prefix.

## API

| Endpoint | Description |
| --- | --- |
| `GET /api/books` | E-books (`school`, `year`, `q`) |
| `GET /api/questions` | Past papers (`year`, `school`, `semester`, `q`) |
| `GET /api/notices` | Notices |
| `GET /api/mcq` | MCQ subject list |
| `GET /api/mcq?subject=ict` | Full MCQ bank |
| `POST /api/mcq` | Auto-evaluate `{ subject, answers }` |

A human-readable version lives at `/api-docs`.

## Deploy (Vercel)

Import the repository as-is and set the project **Root Directory** to the folder
containing this `package.json`. Vercel detects the `nextjs` framework (see
`vercel.json`) and deploys every page, API route, and PDF.js asset as
serverless functions.

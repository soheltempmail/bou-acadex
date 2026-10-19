# BOU Acadex

Bangladesh Open University student academic hub.

## Structure

- Repository root: the Next.js (App Router) + TypeScript backend API.
  - `src/app/api/` — route handlers
  - `src/data/` — JSON datasets
  - `src/lib/`, `src/types/` — shared helpers and types
- `frontend/` — static site.
  - `*.html` — pages (`index`, `books`, `questions`, `suggestions`, `mcq-test`)
  - `css/` — stylesheets
  - `js/core/` — shared runtime (`api.js` client, `main.js` UI helpers)
  - `js/pages/` — per-page scripts (`home`, `books`, `questions`, `suggestions`, `mcq`)
  - `assets/` — logo, favicon, images
  - `server.js` — local static dev server

## Development

Backend API (http://localhost:3000):

```
npm install
npm run dev
```

Frontend static site (http://localhost:5500), in a second terminal:

```
cd frontend
npm run dev
```

The frontend reads its API base from `window.BOU_API_BASE` (default
`http://localhost:3000/api`). To point at another API, set it before
`js/api.js` loads or edit `frontend/js/api.js`.

## API

| Endpoint | Description |
| --- | --- |
| `GET /api/books` | E-books (`school`, `program`, `level`, `q`) |
| `GET /api/questions` | Past papers (`year`, `program`, `school`, `semester`, `q`) |
| `GET /api/suggestions` | Suggestions (`program`, `school`, `semester`, `priority`, `q`) |
| `GET /api/notices` | Notices |
| `GET /api/mcq` | MCQ subject list |
| `GET /api/mcq?subject=ict` | Full MCQ bank |
| `POST /api/mcq` | Auto-evaluate `{ subject, answers }` |

## Deploy (Vercel)

Import the repository as-is. The backend is the project root, so Vercel
detects Next.js automatically. The static `frontend/` folder is served
separately (any static host), pointed at the deployed API via
`window.BOU_API_BASE`.

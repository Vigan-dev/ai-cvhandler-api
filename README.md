# CV Handler API

Minimal TypeScript API built with Express and the `cors` middleware.

## Runtime dependencies

- `express`
- `cors`

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3001` | HTTP server port |
| `CORS_ORIGIN` | `http://localhost:3000` | Allowed frontend origin |

Copy `.env.example` to `.env` to override the defaults. The application loads
the file automatically when it starts.

## Routes

- `GET /`
- `GET /api/health`
- `GET /api/auth`
- `GET /api/users`
- `GET /api/uploads`
- `GET /api/analysis`
- `GET /api/ai/test`
- `GET /api/job-match`

The API is stateless. Client-side resume and upload metadata is stored by the
frontend in browser `localStorage`.

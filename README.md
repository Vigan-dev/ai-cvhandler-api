# CV Handler Local Server

Minimal TypeScript server built with Express.

The application currently uses a browser-local architecture:

- CV files are read in browser memory.
- Candidate analysis is performed in the frontend.
- Derived candidate metadata is stored in browser `localStorage`.
- No database, authentication service, upload service, or remote analysis API is
  currently required.

This server is intentionally limited to health and root endpoints. It remains as
a small foundation for future local-only services, such as OCR or an optional
local Ollama integration.

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

Both routes return JSON. Responses include an `X-Request-Id` header, and error
responses include the same request identifier in their body.

## Security and limits

- Express implementation with strict configured CORS origins.
- One-megabyte JSON request limit.
- Basic API security headers.
- Structured 400, 403, 404, and 500 responses.
- Graceful process shutdown with a timeout.

Removed route groups must not be reintroduced as status-only placeholders.
Future routes should expose a real operation with validated input, typed output,
error handling, and tests.

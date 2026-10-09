# Pulse CRM

A full-stack customer CRUD dashboard built with React + Vite and NestJS.

## Run locally

```bash
npm run install:all
npm run dev
```

Open `http://localhost:5173`.

- Frontend: `client/`
- API: `server/` (`http://localhost:3000/api`)
- Data persists to `server/data/customers.json` after the first write.

## API

`GET /api/customers`, `GET /api/customers/:id`, `POST /api/customers`, `PATCH /api/customers/:id`, `DELETE /api/customers/:id`.

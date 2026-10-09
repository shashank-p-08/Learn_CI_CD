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

## CI/CD

GitHub Actions is configured in `.github/workflows/ci-cd.yml`. Pull requests and pushes to `main`/`feature-crud` install dependencies, build both applications, smoke-test `GET /api/customers`, and stop the API cleanly. Successful pushes to `main`/`feature-crud` publish verified build artifacts and deploy the Vite frontend to Cloudflare Pages.

Configure these GitHub settings before enabling deployment:

- Secret `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with Pages deploy permission.
- Repository variable `VITE_API_URL`: the public URL of the deployed NestJS API, including `/api`.

Examples:

- Local development: `http://localhost:3000/api`
- Render: `https://your-api.onrender.com/api`
- Azure App Service: `https://your-api.azurewebsites.net/api`
- Cloudflare Worker: `https://your-api.workers.dev/api`

After deploying the API, add it in GitHub under **Settings → Secrets and variables → Actions → Variables → New repository variable** with name `VITE_API_URL`. Vite embeds this value during the frontend build, so deploy the frontend again after changing it. The API must also allow requests from your Cloudflare Pages domain through CORS.

The NestJS API is smoke-tested in CI but is not deployed to Pages. Host it separately on a Node-compatible service such as Cloudflare Workers after adapting it to a Worker runtime, Cloudflare Containers, Render, Railway, Fly.io, or Azure App Service.

## API

`GET /api/customers`, `GET /api/customers/:id`, `POST /api/customers`, `PATCH /api/customers/:id`, `DELETE /api/customers/:id`.

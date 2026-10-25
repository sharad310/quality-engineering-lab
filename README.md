# quality-engineering-lab

A QA Automation Engineer portfolio for learning Playwright with a local shopping app.
This first step provides the foundation only; products, cart, and checkout are future work.

## Requirements and setup

Use Node.js 24 LTS (24.14 or newer in the 24.x series) and npm.
From this project directory:

```sh
npm ci
npx playwright install chromium
npm run dev
```

Open http://127.0.0.1:5173. The API runs at http://127.0.0.1:3001/api/health
and returns `{"status":"ok","database":"connected"}`. Stop development with Ctrl+C.

No environment file is required. Optionally copy `.env.example` to `.env`
(PowerShell: `Copy-Item .env.example .env`). The backend reads it automatically.
If you change PORT, also change the proxy in `frontend/vite.config.ts` for development.
Tests always use port 3001 and a separate in-memory database; stop development before testing.

## Folders

- `frontend/src/`: React page and CSS. Vite serves the page and proxies `/api` to Express.
- `backend/src/`: Express server and SQLite connection. The health route checks the connection.
- `tests/ui/`: Playwright browser tests.
- `tests/api/`: Playwright HTTP tests, without a browser.
- `.github/workflows/ci.yml`: GitHub Actions installation, type checking, build, and tests.
- `data/`: local SQLite file, created automatically and ignored by Git.

The project uses one package.json and one package-lock.json to keep setup simple.
Node's built-in SQLite driver avoids a separate database server or native dependency installation.
Node 24 may print an experimental SQLite warning. No shopping schema is created yet.

## Commands

```sh
npm run dev             # Start frontend and backend together
npm run typecheck       # Check frontend, backend, test, and configuration TypeScript
npm run build           # Build frontend/dist and backend/dist
npm test                # Start isolated servers and run API and Chromium smoke tests
npm run test:api         # Run only API tests
npm run test:ui          # Run only browser tests
npm start               # Run the compiled backend after building
npm run preview         # Preview the built frontend on port 4173
```

`preview` serves only the frontend build; use `npm run dev` for the connected local app.
Linux machines may need `npx playwright install --with-deps chromium`.
Tests start and stop their own servers and refuse to reuse an existing app instance.
Reports go to `playwright-report/`; failure traces go to `test-results/`.
CI runs the same checks on pushes and pull requests once this project is placed in a GitHub repository.
The lockfile records exact dependency versions: keep it in version control and use `npm ci` for repeatable installs.

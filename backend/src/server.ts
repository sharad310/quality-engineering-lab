import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const port = Number(process.env.PORT ?? 3001);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}
const databasePath = process.env.DATABASE_PATH ?? './data/shop.sqlite';
if (databasePath !== ':memory:') mkdirSync(dirname(resolve(databasePath)), { recursive: true });
const database = new DatabaseSync(databasePath);
database.exec('PRAGMA foreign_keys = ON');

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.get('/api/health', (_request, response) => {
  try {
    database.prepare('SELECT 1').get();
    response.json({ status: 'ok', database: 'connected' });
  } catch {
    response.status(503).json({ status: 'error', database: 'unavailable' });
  }
});
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`API listening at http://127.0.0.1:${port}`);
});
function shutdown() {
  server.close(() => { database.close(); process.exit(0); });
}
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);

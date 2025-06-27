import { Database } from "bun:sqlite";

export const db = new Database("app.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS pages (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    path TEXT NOT NULL
  )
`);

import { Database } from "bun:sqlite";

export function createDatabase(
  ...args: ConstructorParameters<typeof Database>
): Database {
  const db = new Database(...args);

  // Initialize schema
  db.exec(`
    CREATE TABLE IF NOT EXISTS pages (
      id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      path TEXT NOT NULL
    )
  `);

  return db;
}

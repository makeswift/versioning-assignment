import { Database } from "bun:sqlite";
import { PageSchema, type CreatePageInput, type Page } from "./page.schema";

export class PageService {
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  getOneOrNull({ id }: { id: string }): Page | null {
    const page = this.db.query("SELECT * FROM pages WHERE id = ?").get(id);

    return PageSchema.nullable().parse(page);
  }

  create({ content, path }: CreatePageInput): Page {
    const id = crypto.randomUUID();

    const page = this.db
      .query(
        `INSERT INTO pages (id, content, path)
         VALUES (?, ?, ?)`
      )
      .run(id, content, path);

    return PageSchema.parse(page);
  }
}

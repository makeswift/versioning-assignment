import { Database } from "bun:sqlite";
import {
  PageSchema,
  type CreatePageInput,
  type UpdatePageInput,
  type Page,
} from "./page.schema";

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
         VALUES (?, ?, ?)
         RETURNING *`
      )
      .get(id, content, path);

    return PageSchema.parse(page);
  }

  update(id: string, updates: UpdatePageInput): Page | null {
    const page = this.db
      .query(
        `UPDATE pages
         SET
           content = COALESCE(?, content),
           path = COALESCE(?, path)
         WHERE id = ?
         RETURNING *`
      )
      .get(updates.content ?? null, updates.path ?? null, id);

    return PageSchema.nullable().parse(page);
  }
}

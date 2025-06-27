import { Database } from "bun:sqlite";
import {
  PageSchema,
  type CreatePageInput,
  type UpdatePageInput,
  type Page,
} from "./page.schema";

export class PageService {
  constructor(private db: Database) {}

  getOneOrNull({ id }: { id: string }): Page | null {
    const page = this.db
      .query(
        `SELECT * FROM pages 
         WHERE id = $id`
      )
      .get({ $id: id });

    return PageSchema.nullable().parse(page);
  }

  create({ content, path }: CreatePageInput): Page {
    const id = crypto.randomUUID();

    const page = this.db
      .query(
        `INSERT INTO pages (id, content, path)
         VALUES ($id, $content, $path)
         RETURNING *`
      )
      .get({ $id: id, $content: content, $path: path });

    return PageSchema.parse(page);
  }

  update(id: string, updates: UpdatePageInput): Page | null {
    const page = this.db
      .query(
        `UPDATE pages
         SET
           content = COALESCE($content, content),
           path = COALESCE($path, path)
         WHERE id = $id
         RETURNING *`
      )
      .get({
        $id: id,
        $content: updates.content ?? null,
        $path: updates.path ?? null,
      });

    return PageSchema.nullable().parse(page);
  }
}

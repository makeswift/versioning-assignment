import { createDatabase } from "./database/database.ts";
import { PageService } from "./page/page.service.ts";
import { createServer } from "./server.ts";

const db = createDatabase("app.db");
const pageService = new PageService(db);
const server = createServer(pageService);

console.log(`Server listening on ${server.url}`);

import { createDatabase } from "./database/database.ts";
import { PageController } from "./page/page.controller.ts";
import { PageService } from "./page/page.service.ts";
import { createServer } from "./server.ts";

const db = createDatabase("app.db");
const pageService = new PageService(db);
const pageController = new PageController(pageService);
const server = createServer(pageController);

console.log(`Server listening on ${server.url}`);

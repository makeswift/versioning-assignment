import { z } from "zod/v4";
import { db } from "./database/database.ts";
import { CreatePageSchema } from "./page/page.schema.ts";
import { PageService } from "./page/page.service.ts";

const pageService = new PageService(db);

const server = Bun.serve({
  routes: {
    "/api/pages": {
      // Create post
      POST: async (req) => {
        const input = CreatePageSchema.parse(await req.json());

        const page = pageService.create(input);

        return Response.json(page, { status: 201 });
      },
    },
    // Get page by ID
    "/api/pages/:id": (req) => {
      const page = pageService.getOneOrNull({ id: req.params.id });

      if (!page) return new Response("Not Found", { status: 404 });

      return Response.json(page);
    },
  },
});

console.log(`Server listening on ${server.url}`);

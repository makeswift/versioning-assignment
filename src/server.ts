import { CreatePageSchema, UpdatePageSchema } from "./page/page.schema";
import { PageService } from "./page/page.service";

export function createServer(pageService: PageService, port?: number) {
  return Bun.serve({
    port: port || process.env.PORT || 3000,
    routes: {
      "/v1/pages": {
        // Create page
        POST: async (req) => {
          const parse = CreatePageSchema.safeParse(await req.json());

          if (!parse.success) {
            return Response.json({ error: "Invalid input" }, { status: 400 });
          }

          const page = pageService.create(parse.data);
          return Response.json(page, { status: 201 });
        },
      },
      "/v1/pages/:id": {
        // Get page by ID
        GET: (req) => {
          const page = pageService.getOneOrNull({ id: req.params.id });

          if (!page) return new Response("Not Found", { status: 404 });

          return Response.json(page);
        },
        // Update page
        PATCH: async (req) => {
          const parse = UpdatePageSchema.safeParse(await req.json());

          if (!parse.success) {
            return Response.json({ error: "Invalid input" }, { status: 400 });
          }

          const page = pageService.update(req.params.id, parse.data);

          if (!page) return new Response("Not Found", { status: 404 });

          return Response.json(page);
        },
      },
    },
  });
}

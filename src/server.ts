import { CreatePageSchema } from "./page/page.schema";
import { PageService } from "./page/page.service";

export function createServer(pageService: PageService, port?: number) {
  return Bun.serve({
    port: port || process.env.PORT || 3000,
    routes: {
      "/api/pages": {
        // Create page
        POST: async (req) => {
          const parseResult = CreatePageSchema.safeParse(await req.json());

          if (!parseResult.success) {
            return Response.json({ error: "Invalid input" }, { status: 400 });
          }

          const page = pageService.create(parseResult.data);
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
}

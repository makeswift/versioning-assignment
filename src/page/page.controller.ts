import { CreatePageSchema, UpdatePageSchema } from "./page.schema";
import { PageService } from "./page.service";

interface RouteRequest extends Request {
  params: Record<string, string>;
}

export class PageController {
  constructor(private pageService: PageService) {}

  async createPage(req: Bun.BunRequest<"/v1/pages">): Promise<Response> {
    const parse = CreatePageSchema.safeParse(await req.json());

    if (!parse.success) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const page = this.pageService.create(parse.data);
    return Response.json(page, { status: 201 });
  }

  getPageById(req: Bun.BunRequest<"/v1/pages/:id">): Response {
    const id = req.params.id;

    const page = this.pageService.getOneOrNull({ id });

    if (!page) return new Response("Not Found", { status: 404 });

    return Response.json(page);
  }

  async updatePage(req: Bun.BunRequest<"/v1/pages/:id">): Promise<Response> {
    const id = req.params.id;
    const parse = UpdatePageSchema.safeParse(await req.json());

    if (!parse.success) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const page = this.pageService.update(id, parse.data);

    if (!page) return new Response("Not Found", { status: 404 });

    return Response.json(page);
  }
}

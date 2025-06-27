import { PageController } from "./page/page.controller";

export function createServer(pageController: PageController, port?: number) {
  return Bun.serve({
    port: port || process.env.PORT || 3000,
    routes: {
      "/v1/pages": {
        POST: (req) => pageController.createPage(req),
      },
      "/v1/pages/:id": {
        GET: (req) => pageController.getPageById(req),
        PATCH: (req) => pageController.updatePage(req),
      },
    },
  });
}

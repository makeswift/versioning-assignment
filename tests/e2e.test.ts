import { expect, describe, beforeAll, afterAll, it } from "bun:test";
import { PageService } from "../src/page/page.service";
import { createServer } from "../src/server";
import { createDatabase } from "../src/database/database";
import type { Page } from "../src/page/page.schema";

const testDb = createDatabase(":memory:");
const pageService = new PageService(testDb);
let server: Bun.Server;
const port = 3333;

beforeAll(async () => {
  server = createServer(pageService, port);
});

afterAll(() => {
  if (server) server.stop();
  testDb.close();
});

describe("POST /api/pages", () => {
  it("should create a new page", async () => {
    const input = { content: "content", path: "/page" };

    const response = await fetch(`${server.url}/api/pages`, {
      method: "POST",
      body: JSON.stringify(input),
    });

    expect(response.status).toBe(201);
    const page = (await response.json()) as Page;
    expect(page.content).toBe(input.content);
    expect(page.path).toBe(input.path);
  });
});

describe("GET /api/pages/:id", () => {
  it("should retrieve a page by ID", async () => {
    const input = { content: "content", path: "/page" };
    const createdPage = pageService.create(input);

    const response = await fetch(`${server.url}/api/pages/${createdPage.id}`);

    expect(response.status).toBe(200);
    const page = (await response.json()) as Page;
    expect(page.content).toBe(input.content);
    expect(page.path).toBe(input.path);
  });

  it("should return 404 for non-existent page", async () => {
    const fakeId = crypto.randomUUID();

    const response = await fetch(`${server.url}/api/pages/${fakeId}`);

    expect(response.status).toBe(404);
  });
});

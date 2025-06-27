import { expect, test, beforeAll, afterAll } from "bun:test";
import { PageService } from "../../src/page/page.service";
import { createServer } from "../../src/server";
import { createDatabase } from "../../src/database/database";
import type { Page } from "../../src/page/page.schema";

// Create test database
const testDb = createDatabase(":memory:");
const pageService = new PageService(testDb);
let server: any;
const port = 3333;
const baseUrl = `http://localhost:${port}`;

beforeAll(async () => {
  // Start test server using the same logic as main app
  server = createServer(pageService, port);
  
  // Wait a bit for server to start
  await new Promise((resolve) => setTimeout(resolve, 100));
});

afterAll(() => {
  if (server) {
    server.stop();
  }
  testDb.close();
});

test("E2E: POST /api/pages - should create a new page", async () => {
  const pageData = {
    content: "E2E test page content",
    path: "/e2e-test-page",
  };

  const response = await fetch(`${baseUrl}/api/pages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pageData),
  });

  expect(response.status).toBe(201);

  const page = (await response.json()) as Page;
  expect(page).toHaveProperty("id");
  expect(page.content).toBe(pageData.content);
  expect(page.path).toBe(pageData.path);
});

test("E2E: GET /api/pages/:id - should retrieve a page by ID", async () => {
  // First create a page
  const pageData = {
    content: "Another E2E test page",
    path: "/another-e2e-test",
  };

  const createResponse = await fetch(`${baseUrl}/api/pages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pageData),
  });

  const createdPage = (await createResponse.json()) as Page;

  // Then retrieve it
  const getResponse = await fetch(`${baseUrl}/api/pages/${createdPage.id}`);

  expect(getResponse.status).toBe(200);

  const retrievedPage = (await getResponse.json()) as Page;
  expect(retrievedPage.id).toBe(createdPage.id);
  expect(retrievedPage.content).toBe(pageData.content);
  expect(retrievedPage.path).toBe(pageData.path);
});

test("E2E: GET /api/pages/:id - should return 404 for non-existent page", async () => {
  const fakeId = "550e8400-e29b-41d4-a716-446655440000";

  const response = await fetch(`${baseUrl}/api/pages/${fakeId}`);

  expect(response.status).toBe(404);
});

test("E2E: POST /api/pages - should validate input", async () => {
  const invalidPageData = {
    content: "",
    // Missing path
  };

  const response = await fetch(`${baseUrl}/api/pages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invalidPageData),
  });

  expect(response.status).toBe(400);
});

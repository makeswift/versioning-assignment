import { expect, test } from "bun:test";
import { PageService } from "../../src/page/page.service";
import { CreatePageSchema, type Page } from "../../src/page/page.schema";
import { createDatabase } from "../../src/database/database";

// Create in-memory database for tests
const testDb = createDatabase(":memory:");
const pageService = new PageService(testDb);

test("PageService - create page", () => {
  const input = {
    content: "Test page content",
    path: "/test-page"
  };

  const page = pageService.create(input);

  expect(page).toHaveProperty("id");
  expect(page.content).toBe(input.content);
  expect(page.path).toBe(input.path);
  expect(typeof page.id).toBe("string");
});

test("PageService - get existing page", () => {
  // Create a page first
  const input = {
    content: "Another test page",
    path: "/another-test"
  };
  
  const createdPage = pageService.create(input);
  
  // Retrieve it
  const retrievedPage = pageService.getOneOrNull({ id: createdPage.id });
  
  expect(retrievedPage).not.toBeNull();
  expect(retrievedPage!.id).toBe(createdPage.id);
  expect(retrievedPage!.content).toBe(input.content);
  expect(retrievedPage!.path).toBe(input.path);
});

test("PageService - get non-existent page", () => {
  const nonExistentId = "550e8400-e29b-41d4-a716-446655440000";
  
  const page = pageService.getOneOrNull({ id: nonExistentId });
  
  expect(page).toBeNull();
});

test("CreatePageSchema - validates correct input", () => {
  const validInput = {
    content: "Valid content",
    path: "/valid-path"
  };

  const result = CreatePageSchema.safeParse(validInput);
  expect(result.success).toBe(true);
});

test("CreatePageSchema - rejects invalid input", () => {
  const invalidInput = {
    content: "",
    // missing path
  };

  const result = CreatePageSchema.safeParse(invalidInput);
  expect(result.success).toBe(false);
});
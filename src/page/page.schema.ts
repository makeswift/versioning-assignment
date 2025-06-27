import { z } from "zod/v4";

export const PageSchema = z.object({
  id: z.uuid(),
  content: z.string(),
  path: z.string(),
});

export type Page = z.infer<typeof PageSchema>;

export const CreatePageSchema = PageSchema.omit({ id: true });

export type CreatePageInput = z.infer<typeof CreatePageSchema>;

export const UpdatePageSchema = PageSchema.omit({ id: true }).partial();

export type UpdatePageInput = z.infer<typeof UpdatePageSchema>;

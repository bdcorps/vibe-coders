import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'twitter' | 'linkedin'
  embedId: text("embed_id").notNull(),
  tags: text("tags").array().notNull(),
});

export const insertPostSchema = createInsertSchema(posts);

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;

export type Tag = {
  id: string;
  label: string;
  category: 'industry' | 'technology';
};

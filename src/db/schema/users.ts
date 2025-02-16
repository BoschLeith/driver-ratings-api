import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: text().notNull().unique(),
  password: text().notNull(),
  refreshToken: text("refresh_token").default(sql`NULL`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

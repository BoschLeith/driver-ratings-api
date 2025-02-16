import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const drivers = pgTable("drivers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type InsertDriver = typeof drivers.$inferInsert;
export type SelectDriver = typeof drivers.$inferSelect;

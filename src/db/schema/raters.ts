import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const raters = pgTable("raters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type InsertRater = typeof raters.$inferInsert;
export type SelectRater = typeof raters.$inferSelect;

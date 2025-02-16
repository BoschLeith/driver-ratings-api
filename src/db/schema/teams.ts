import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const teams = pgTable("teams", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  fullName: text("full_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type InsertTeam = typeof teams.$inferInsert;
export type SelectTeam = typeof teams.$inferSelect;

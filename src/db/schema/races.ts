import { sql } from "drizzle-orm";
import { date, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const races = pgTable("races", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  date: date().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type InsertRace = typeof races.$inferInsert;
export type SelectRace = typeof races.$inferSelect;

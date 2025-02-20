import { sql } from "drizzle-orm";
import { date, integer, pgTable, timestamp } from "drizzle-orm/pg-core";

import { grandPrixs } from "./grandPrixs";

export const races = pgTable("races", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  grandPrixId: integer("grand_prix_id")
    .references(() => grandPrixs.id)
    .notNull(),
  date: date().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type InsertRace = typeof races.$inferInsert;
export type SelectRace = typeof races.$inferSelect;

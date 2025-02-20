import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";

import { drivers } from "./drivers";
import { races } from "./races";
import { teams } from "./teams";

export const results = pgTable("results", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  driverId: integer("driver_id")
    .references(() => drivers.id)
    .notNull(),
  teamId: integer("team_id")
    .references(() => teams.id)
    .notNull(),
  raceId: integer("race_id")
    .references(() => races.id)
    .notNull(),
  position: integer().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type InsertResult = typeof results.$inferInsert;
export type SelectResult = typeof results.$inferSelect;

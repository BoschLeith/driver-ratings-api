import { sql } from "drizzle-orm";
import { integer, pgTable, real, timestamp } from "drizzle-orm/pg-core";

import { driverTeams } from "./driverTeams";
import { raters } from "./raters";

export const ratings = pgTable("ratings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  driverTeamId: integer("driver_team_id")
    .references(() => driverTeams.id)
    .notNull(),
  raterId: integer("rater_id")
    .references(() => raters.id)
    .notNull(),
  rating: real().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type InsertRating = typeof ratings.$inferInsert;
export type SelectRating = typeof ratings.$inferSelect;

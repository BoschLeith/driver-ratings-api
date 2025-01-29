import { sql } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export const teamsTable = pgTable("teams", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  fullName: text("full_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export const driversTable = pgTable("drivers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export const racesTable = pgTable("races", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  date: date().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export const ratersTable = pgTable("raters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export const ratingsTable = pgTable("ratings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  driverTeamId: integer("driver_team_id")
    .references(() => driverTeamsTable.id)
    .notNull(),
  raterId: integer("rater_id")
    .references(() => ratersTable.id)
    .notNull(),
  rating: real().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export const driverTeamsTable = pgTable("driver_teams", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  driverId: integer("driver_id")
    .references(() => driversTable.id)
    .notNull(),
  teamId: integer("team_id")
    .references(() => teamsTable.id)
    .notNull(),
  raceId: integer("race_id")
    .references(() => racesTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertTeam = typeof teamsTable.$inferInsert;
export type SelectTeam = typeof teamsTable.$inferSelect;

export type InsertDriver = typeof driversTable.$inferInsert;
export type SelectDriver = typeof driversTable.$inferSelect;

export type InsertRace = typeof racesTable.$inferInsert;
export type SelectRace = typeof racesTable.$inferSelect;

export type InsertRater = typeof ratersTable.$inferInsert;
export type SelectRater = typeof ratersTable.$inferSelect;

export type InsertRating = typeof ratingsTable.$inferInsert;
export type SelectRating = typeof ratingsTable.$inferSelect;

export type InsertDriverTeam = typeof driverTeamsTable.$inferInsert;
export type SelectDriverTeam = typeof driverTeamsTable.$inferSelect;

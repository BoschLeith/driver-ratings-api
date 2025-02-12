import { sql } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

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

export const teams = pgTable("teams", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  fullName: text("full_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export const drivers = pgTable("drivers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export const races = pgTable("races", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  date: date().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export const raters = pgTable("raters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

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

export const driverTeams = pgTable("driver_teams", {
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
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertTeam = typeof teams.$inferInsert;
export type SelectTeam = typeof teams.$inferSelect;

export type InsertDriver = typeof drivers.$inferInsert;
export type SelectDriver = typeof drivers.$inferSelect;

export type InsertRace = typeof races.$inferInsert;
export type SelectRace = typeof races.$inferSelect;

export type InsertRater = typeof raters.$inferInsert;
export type SelectRater = typeof raters.$inferSelect;

export type InsertRating = typeof ratings.$inferInsert;
export type SelectRating = typeof ratings.$inferSelect;

export type InsertDriverTeam = typeof driverTeams.$inferInsert;
export type SelectDriverTeam = typeof driverTeams.$inferSelect;

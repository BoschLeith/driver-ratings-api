import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const teamsTable = pgTable("teams", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  fullName: text("full_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertTeam = typeof teamsTable.$inferInsert;
export type SelectTeam = typeof teamsTable.$inferSelect;

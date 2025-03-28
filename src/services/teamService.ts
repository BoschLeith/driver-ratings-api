import { eq } from "drizzle-orm";

import db from "../db";
import { InsertTeam, teams } from "../db/schema/teams";

export const getAllTeams = async () => {
  return await db.select().from(teams);
};

export const getTeamById = async (id: number) => {
  return await db.select().from(teams).where(eq(teams.id, id));
};

export const createTeam = async (team: InsertTeam) => {
  return await db.insert(teams).values(team).returning();
};

export const updateTeam = async (id: number, team: InsertTeam) => {
  return await db.update(teams).set(team).where(eq(teams.id, id)).returning();
};

export const deleteTeam = async (id: number) => {
  return await db.delete(teams).where(eq(teams.id, id)).returning();
};

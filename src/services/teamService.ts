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
  await db.insert(teams).values(team);
};

export const updateTeam = async (id: number, team: InsertTeam) => {
  await db.update(teams).set(team).where(eq(teams.id, id));
};

export const deleteTeam = async (id: number) => {
  await db.delete(teams).where(eq(teams.id, id));
};

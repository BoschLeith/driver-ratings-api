import { eq } from "drizzle-orm";

import db from "../db";
import { InsertTeam, teamsTable } from "../db/schema";

export const getAllTeams = async () => {
  return await db.select().from(teamsTable);
};

export const getTeamById = async (id: number) => {
  return await db.select().from(teamsTable).where(eq(teamsTable.id, id));
};

export const createTeam = async (teamData: InsertTeam) => {
  await db.insert(teamsTable).values(teamData);
};

export const updateTeam = async (id: number, teamData: InsertTeam) => {
  await db.update(teamsTable).set(teamData).where(eq(teamsTable.id, id));
};

export const deleteTeam = async (id: number) => {
  await db.delete(teamsTable).where(eq(teamsTable.id, id));
};

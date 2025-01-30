import { eq } from "drizzle-orm";

import db from "../db";
import { InsertDriverTeam, driverTeamsTable } from "../db/schema";

export const getAllDriverTeams = async () => {
  return await db.select().from(driverTeamsTable);
};

export const getDriverTeamById = async (id: number) => {
  return await db
    .select()
    .from(driverTeamsTable)
    .where(eq(driverTeamsTable.id, id));
};

export const createDriverTeam = async (driverTeamData: InsertDriverTeam) => {
  await db.insert(driverTeamsTable).values(driverTeamData);
};

export const updateDriverTeam = async (
  id: number,
  driverTeamData: InsertDriverTeam
) => {
  await db
    .update(driverTeamsTable)
    .set(driverTeamData)
    .where(eq(driverTeamsTable.id, id));
};

export const deleteDriverTeam = async (id: number) => {
  await db.delete(driverTeamsTable).where(eq(driverTeamsTable.id, id));
};

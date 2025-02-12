import { eq } from "drizzle-orm";

import db from "../db";
import { InsertDriverTeam, driverTeams } from "../db/schema";

export const getAllDriverTeams = async () => {
  return await db.select().from(driverTeams);
};

export const getDriverTeamById = async (id: number) => {
  return await db.select().from(driverTeams).where(eq(driverTeams.id, id));
};

export const createDriverTeam = async (driverTeam: InsertDriverTeam) => {
  await db.insert(driverTeams).values(driverTeam);
};

export const updateDriverTeam = async (
  id: number,
  driverTeam: InsertDriverTeam
) => {
  await db.update(driverTeams).set(driverTeam).where(eq(driverTeams.id, id));
};

export const deleteDriverTeam = async (id: number) => {
  await db.delete(driverTeams).where(eq(driverTeams.id, id));
};

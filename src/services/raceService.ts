import { eq } from "drizzle-orm";

import db from "../db";
import { InsertRace, racesTable } from "../db/schema";

export const getAllRaces = async () => {
  return await db.select().from(racesTable).orderBy(racesTable.id);
};

export const getRaceById = async (id: number) => {
  return await db.select().from(racesTable).where(eq(racesTable.id, id));
};

export const createRace = async (raceData: InsertRace) => {
  await db.insert(racesTable).values(raceData);
};

export const updateRace = async (id: number, raceData: InsertRace) => {
  await db.update(racesTable).set(raceData).where(eq(racesTable.id, id));
};

export const deleteRace = async (id: number) => {
  await db.delete(racesTable).where(eq(racesTable.id, id));
};

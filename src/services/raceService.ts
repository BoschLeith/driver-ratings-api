import { eq } from "drizzle-orm";

import db from "../db";
import { InsertRace, races } from "../db/schema/races";

export const getAllRaces = async () => {
  return await db.select().from(races).orderBy(races.id);
};

export const getRaceById = async (id: number) => {
  return await db.select().from(races).where(eq(races.id, id));
};

export const createRace = async (race: InsertRace) => {
  return await db.insert(races).values(race).returning();
};

export const updateRace = async (id: number, race: InsertRace) => {
  return await db.update(races).set(race).where(eq(races.id, id)).returning();
};

export const deleteRace = async (id: number) => {
  return await db.delete(races).where(eq(races.id, id)).returning();
};

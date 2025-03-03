import { eq } from "drizzle-orm";

import db from "../db";
import { InsertGrandPrix, grandPrixs } from "../db/schema/grandPrixs";
import { races } from "../db/schema/races";
import { getPackedSettings } from "http2";

export const getAllGrandPrixs = async () => {
  return await db.select().from(grandPrixs).orderBy(grandPrixs.id);
};

export const getGrandPrixById = async (id: number) => {
  return await db.select().from(grandPrixs).where(eq(grandPrixs.id, id));
};

export const createGrandPrix = async (grandPrix: InsertGrandPrix) => {
  await db.insert(grandPrixs).values(grandPrix);
};

export const updateGrandPrix = async (
  id: number,
  grandPrix: InsertGrandPrix
) => {
  await db.update(grandPrixs).set(grandPrix).where(eq(grandPrixs.id, id));
};

export const deleteGrandPrix = async (id: number) => {
  await db.delete(grandPrixs).where(eq(grandPrixs.id, id));
};

export const getGrandPrixRaces = async (grandPrixId: number) => {
  return await db
    .select({
      id: races.id,
      date: races.date,
    })
    .from(grandPrixs)
    .innerJoin(races, eq(grandPrixs.id, races.grandPrixId))
    .where(eq(grandPrixs.id, grandPrixId));
};

import { eq } from "drizzle-orm";

import db from "../db";
import { InsertRater, ratersTable } from "../db/schema";

export const getAllRaters = async () => {
  return await db.select().from(ratersTable);
};

export const getRaterById = async (id: number) => {
  return await db.select().from(ratersTable).where(eq(ratersTable.id, id));
};

export const createRater = async (raterData: InsertRater) => {
  await db.insert(ratersTable).values(raterData);
};

export const updateRater = async (id: number, raterData: InsertRater) => {
  await db.update(ratersTable).set(raterData).where(eq(ratersTable.id, id));
};

export const deleteRater = async (id: number) => {
  await db.delete(ratersTable).where(eq(ratersTable.id, id));
};

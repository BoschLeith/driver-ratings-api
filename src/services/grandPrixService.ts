import { eq } from "drizzle-orm";

import db from "../db";
import { InsertGrandPrix, grandPrixs } from "../db/schema/grandPrixs";

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

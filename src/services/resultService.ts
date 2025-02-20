import { eq } from "drizzle-orm";

import db from "../db";
import { InsertResult, results } from "../db/schema/results";

export const getAllResults = async () => {
  return await db.select().from(results);
};

export const getResultById = async (id: number) => {
  return await db.select().from(results).where(eq(results.id, id));
};

export const createResult = async (result: InsertResult) => {
  await db.insert(results).values(result);
};

export const updateResult = async (id: number, result: InsertResult) => {
  await db.update(results).set(result).where(eq(results.id, id));
};

export const deleteResult = async (id: number) => {
  await db.delete(results).where(eq(results.id, id));
};

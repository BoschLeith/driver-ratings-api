import { eq } from "drizzle-orm";

import db from "../db";
import { InsertRater, raters } from "../db/schema";

export const getAllRaters = async () => {
  return await db.select().from(raters);
};

export const getRaterById = async (id: number) => {
  return await db.select().from(raters).where(eq(raters.id, id));
};

export const createRater = async (rater: InsertRater) => {
  await db.insert(raters).values(rater);
};

export const updateRater = async (id: number, rater: InsertRater) => {
  await db.update(raters).set(rater).where(eq(raters.id, id));
};

export const deleteRater = async (id: number) => {
  await db.delete(raters).where(eq(raters.id, id));
};

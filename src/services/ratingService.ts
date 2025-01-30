import { eq } from "drizzle-orm";

import db from "../db";
import { InsertRating, ratingsTable } from "../db/schema";

export const getAllRatings = async () => {
  return await db.select().from(ratingsTable);
};

export const getRatingById = async (id: number) => {
  return await db.select().from(ratingsTable).where(eq(ratingsTable.id, id));
};

export const createRating = async (ratingData: InsertRating) => {
  await db.insert(ratingsTable).values(ratingData);
};

export const updateRating = async (id: number, ratingData: InsertRating) => {
  await db.update(ratingsTable).set(ratingData).where(eq(ratingsTable.id, id));
};

export const deleteRating = async (id: number) => {
  await db.delete(ratingsTable).where(eq(ratingsTable.id, id));
};

import { eq } from "drizzle-orm";

import db from "../db";
import { InsertRating, ratings } from "../db/schema/ratings";

export const getAllRatings = async () => {
  return await db.select().from(ratings);
};

export const getRatingById = async (id: number) => {
  return await db.select().from(ratings).where(eq(ratings.id, id));
};

export const createRating = async (rating: InsertRating) => {
  await db.insert(ratings).values(rating);
};

export const updateRating = async (id: number, rating: InsertRating) => {
  await db.update(ratings).set(rating).where(eq(ratings.id, id));
};

export const deleteRating = async (id: number) => {
  await db.delete(ratings).where(eq(ratings.id, id));
};

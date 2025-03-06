import { eq, sql } from "drizzle-orm";

import db from "../db";
import { races } from "../db/schema/races";
import { raters } from "../db/schema/raters";
import { ratings } from "../db/schema/ratings";
import { InsertResult, results } from "../db/schema/results";

export const getAllResults = async () => {
  return await db.select().from(results);
};

export const getResultById = async (id: number) => {
  return await db.select().from(results).where(eq(results.id, id));
};

export const createResult = async (result: InsertResult[]) => {
  return await db
    .insert(results)
    .values(result)
    .returning({ id: results.id, driverId: results.driverId });
};

export const updateResult = async (id: number, result: InsertResult) => {
  await db.update(results).set(result).where(eq(results.id, id));
};

export const deleteResult = async (id: number) => {
  await db.delete(results).where(eq(results.id, id));
};

export const getResultsByYear = async (year: number) => {
  return await db
    .select({
      raceId: results.raceId,
      driverId: results.driverId,
      raterId: ratings.raterId,
      rating: ratings.rating,
      name: raters.name,
      position: results.position,
    })
    .from(results)
    .innerJoin(ratings, eq(results.id, ratings.resultId))
    .innerJoin(raters, eq(ratings.raterId, raters.id))
    .innerJoin(races, eq(results.raceId, races.id))
    .where(sql`EXTRACT(YEAR FROM ${races.date}) = ${year}`)
    .orderBy(results.position);
};

import { eq } from "drizzle-orm";

import db from "../db";
import { driversTable, InsertDriver } from "../db/schema";

export const getAllDrivers = async () => {
  return await db.select().from(driversTable);
};

export const getDriverById = async (id: number) => {
  return await db.select().from(driversTable).where(eq(driversTable.id, id));
};

export const createDriver = async (driverData: InsertDriver) => {
  await db.insert(driversTable).values(driverData);
};

export const updateDriver = async (id: number, driverData: InsertDriver) => {
  await db.update(driversTable).set(driverData).where(eq(driversTable.id, id));
};

export const deleteDriver = async (id: number) => {
  await db.delete(driversTable).where(eq(driversTable.id, id));
};

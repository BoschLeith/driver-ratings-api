import { eq } from "drizzle-orm";

import db from "../db";
import { drivers, InsertDriver } from "../db/schema";

export const getAllDrivers = async () => {
  return await db.select().from(drivers);
};

export const getDriverById = async (id: number) => {
  return await db.select().from(drivers).where(eq(drivers.id, id));
};

export const createDriver = async (driver: InsertDriver) => {
  await db.insert(drivers).values(driver);
};

export const updateDriver = async (id: number, driver: InsertDriver) => {
  await db.update(drivers).set(driver).where(eq(drivers.id, id));
};

export const deleteDriver = async (id: number) => {
  await db.delete(drivers).where(eq(drivers.id, id));
};

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Request, Response, Router } from "express";

import { driversTable, InsertDriver } from "../db/schema";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

const db = drizzle(process.env.DATABASE_URL!);

// Get All Drivers
router.get("/", async (req: Request, res: Response) => {
  try {
    const drivers = await db.select().from(driversTable);
    res.status(200).json({ success: true, data: drivers });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Driver by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const driver = await db
      .select()
      .from(driversTable)
      .where(eq(driversTable.id, Number(id)));

    if (driver.length === 0) {
      res.status(404).json({ success: false, message: "Driver not found" });
      return;
    }

    res.status(200).json({ success: true, data: driver });
  } catch (error) {
    console.error("Error fetching driver:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a New Driver
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    await db.insert(driversTable).values({
      name,
    });

    res.status(201).json({ message: "Driver created successfully" });
  } catch (error) {
    console.error("Error creating driver:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update Driver by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const updateData: InsertDriver = {
    name,
  };

  try {
    const existingDriver = await db
      .select()
      .from(driversTable)
      .where(eq(driversTable.id, Number(id)));

    if (existingDriver.length === 0) {
      res.status(404).json({ success: false, message: "Driver not found" });
      return;
    }

    await db
      .update(driversTable)
      .set(updateData)
      .where(eq(driversTable.id, Number(id)));

    res.status(200).json({ message: "Driver updated successfully" });
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete Driver by ID
router.delete("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingDriver = await db
      .select()
      .from(driversTable)
      .where(eq(driversTable.id, Number(id)));

    if (existingDriver.length === 0) {
      res.status(404).json({ success: false, message: "Driver not found" });
      return;
    }

    await db.delete(driversTable).where(eq(driversTable.id, Number(id)));

    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    console.error("Error deleting driver:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

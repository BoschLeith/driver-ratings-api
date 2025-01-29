import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Request, Response, Router } from "express";

import { InsertRace, racesTable } from "../db/schema";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

const db = drizzle(process.env.DATABASE_URL!);

// Get All Races
router.get("/", async (req: Request, res: Response) => {
  try {
    const races = await db.select().from(racesTable);
    res.status(200).json({ success: true, data: races });
  } catch (error) {
    console.error("Error fetching races:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Race by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const race = await db
      .select()
      .from(racesTable)
      .where(eq(racesTable.id, Number(id)));

    if (race.length === 0) {
      res.status(404).json({ success: false, message: "Race not found" });
      return;
    }

    res.status(200).json({ success: true, data: race });
  } catch (error) {
    console.error("Error fetching race:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a New Race
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { name, date } = req.body;

  try {
    await db.insert(racesTable).values({
      name,
      date,
    });

    res.status(201).json({ message: "Race created successfully" });
  } catch (error) {
    console.error("Error creating race:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update Race by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, date } = req.body;

  const updateData: InsertRace = {
    name,
    date,
  };

  try {
    const existingRace = await db
      .select()
      .from(racesTable)
      .where(eq(racesTable.id, Number(id)));

    if (existingRace.length === 0) {
      res.status(404).json({ success: false, message: "Race not found" });
      return;
    }

    await db
      .update(racesTable)
      .set(updateData)
      .where(eq(racesTable.id, Number(id)));

    res.status(200).json({ message: "Race updated successfully" });
  } catch (error) {
    console.error("Error updating race:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete Race by ID
router.delete("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingRace = await db
      .select()
      .from(racesTable)
      .where(eq(racesTable.id, Number(id)));

    if (existingRace.length === 0) {
      res.status(404).json({ success: false, message: "Race not found" });
      return;
    }

    await db.delete(racesTable).where(eq(racesTable.id, Number(id)));

    res.status(200).json({ message: "Race deleted successfully" });
  } catch (error) {
    console.error("Error deleting race:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

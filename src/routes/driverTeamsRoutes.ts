import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Request, Response, Router } from "express";

import { driverTeamsTable, InsertDriverTeam } from "../db/schema";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

const db = drizzle(process.env.DATABASE_URL!);

// Get All Driver Teams
router.get("/", async (req: Request, res: Response) => {
  try {
    const driverTeams = await db.select().from(driverTeamsTable);
    res.status(200).json({ success: true, data: driverTeams });
  } catch (error) {
    console.error("Error fetching driver teams:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Driver Team by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const driverTeam = await db
      .select()
      .from(driverTeamsTable)
      .where(eq(driverTeamsTable.id, Number(id)));

    if (driverTeam.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "Driver team not found" });
      return;
    }

    res.status(200).json({ success: true, data: driverTeam });
  } catch (error) {
    console.error("Error fetching driver team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a New Driver Team
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { driverId, teamId, raceId } = req.body;

  try {
    await db.insert(driverTeamsTable).values({
      driverId,
      teamId,
      raceId,
    });

    res.status(201).json({ message: "Driver team created successfully" });
  } catch (error) {
    console.error("Error creating driver team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update Driver Team by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { driverId, teamId, raceId } = req.body;

  const updateData: InsertDriverTeam = {
    driverId,
    teamId,
    raceId,
  };

  try {
    const existingDriverTeam = await db
      .select()
      .from(driverTeamsTable)
      .where(eq(driverTeamsTable.id, Number(id)));

    if (existingDriverTeam.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "Driver team not found" });
      return;
    }

    await db
      .update(driverTeamsTable)
      .set(updateData)
      .where(eq(driverTeamsTable.id, Number(id)));

    res.status(200).json({ message: "Driver team updated successfully" });
  } catch (error) {
    console.error("Error updating driver team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete Driver Team by ID
router.delete("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingDriverTeam = await db
      .select()
      .from(driverTeamsTable)
      .where(eq(driverTeamsTable.id, Number(id)));

    if (existingDriverTeam.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "Driver team not found" });
      return;
    }

    await db
      .delete(driverTeamsTable)
      .where(eq(driverTeamsTable.id, Number(id)));

    res.status(200).json({ message: "Driver team deleted successfully" });
  } catch (error) {
    console.error("Error deleting driver team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

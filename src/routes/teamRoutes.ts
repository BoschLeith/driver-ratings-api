import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Request, Response, Router } from "express";

import { InsertTeam, teamsTable } from "../db/schema";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

const db = drizzle(process.env.DATABASE_URL!);

// Get All Teams
router.get("/", async (req: Request, res: Response) => {
  try {
    const teams = await db.select().from(teamsTable);
    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Team by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const team = await db
      .select()
      .from(teamsTable)
      .where(eq(teamsTable.id, Number(id)));

    if (team.length === 0) {
      res.status(404).json({ success: false, message: "Team not found" });
      return;
    }

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a New Team
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { name, fullName } = req.body;

  try {
    await db.insert(teamsTable).values({
      name,
      fullName,
    });

    res.status(201).json({ message: "Team created successfully" });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update Team by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, fullName } = req.body;

  const updateData: InsertTeam = {
    name,
    fullName,
  };

  try {
    const existingTeam = await db
      .select()
      .from(teamsTable)
      .where(eq(teamsTable.id, Number(id)));

    if (existingTeam.length === 0) {
      res.status(404).json({ success: false, message: "Team not found" });
      return;
    }

    await db
      .update(teamsTable)
      .set(updateData)
      .where(eq(teamsTable.id, Number(id)));

    res.status(200).json({ message: "Team updated successfully" });
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete Team by ID
router.delete("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingTeam = await db
      .select()
      .from(teamsTable)
      .where(eq(teamsTable.id, Number(id)));

    if (existingTeam.length === 0) {
      res.status(404).json({ success: false, message: "Team not found" });
      return;
    }

    await db.delete(teamsTable).where(eq(teamsTable.id, Number(id)));

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

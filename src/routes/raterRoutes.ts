import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Request, Response, Router } from "express";

import { authenticateJWT } from "../middlewares/authMiddleware";
import { InsertRater, ratersTable } from "../db/schema";

const router = Router();

const db = drizzle(process.env.DATABASE_URL!);

// Get All Raters
router.get("/", async (req: Request, res: Response) => {
  try {
    const raters = await db.select().from(ratersTable);
    res.status(200).json({ success: true, data: raters });
  } catch (error) {
    console.error("Error fetching raters:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Rater by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const rater = await db
      .select()
      .from(ratersTable)
      .where(eq(ratersTable.id, Number(id)));

    if (rater.length === 0) {
      res.status(404).json({ success: false, message: "Rater not found" });
      return;
    }

    res.status(200).json({ success: true, data: rater });
  } catch (error) {
    console.error("Error fetching rater:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a New Rater
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    await db.insert(ratersTable).values({
      name,
    });

    res.status(201).json({ message: "Rater created successfully" });
  } catch (error) {
    console.error("Error creating rater:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update Rater by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const updateData: InsertRater = {
    name,
  };

  try {
    const existingRater = await db
      .select()
      .from(ratersTable)
      .where(eq(ratersTable.id, Number(id)));

    if (existingRater.length === 0) {
      res.status(404).json({ success: false, message: "Rater not found" });
      return;
    }

    await db
      .update(ratersTable)
      .set(updateData)
      .where(eq(ratersTable.id, Number(id)));

    res.status(200).json({ message: "Rater updated successfully" });
  } catch (error) {
    console.error("Error updating rater:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete Rater by ID
router.delete("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingRater = await db
      .select()
      .from(ratersTable)
      .where(eq(ratersTable.id, Number(id)));

    if (existingRater.length === 0) {
      res.status(404).json({ success: false, message: "Rater not found" });
      return;
    }

    await db.delete(ratersTable).where(eq(ratersTable.id, Number(id)));

    res.status(200).json({ message: "Rater deleted successfully" });
  } catch (error) {
    console.error("Error deleting rater:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

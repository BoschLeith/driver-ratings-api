import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Request, Response, Router } from "express";

import { authenticateJWT } from "../middlewares/authMiddleware";
import { InsertRating, ratingsTable } from "../db/schema";

const router = Router();

const db = drizzle(process.env.DATABASE_URL!);

// Get All Ratings
router.get("/", async (req: Request, res: Response) => {
  try {
    const ratings = await db.select().from(ratingsTable);
    res.status(200).json({ success: true, data: ratings });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Ratings by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const rating = await db
      .select()
      .from(ratingsTable)
      .where(eq(ratingsTable.id, Number(id)));

    if (rating.length === 0) {
      res.status(404).json({ success: false, message: "Rating not found" });
      return;
    }

    res.status(200).json({ success: true, data: rating });
  } catch (error) {
    console.error("Error fetching rating:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a New Rating
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { driverId, raceId, raterId, rating } = req.body;

  try {
    await db.insert(ratingsTable).values({
      driverId,
      raceId,
      raterId,
      rating,
    });

    res.status(201).json({ message: "Rating created successfully" });
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update Rating by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { driverId, raceId, raterId, rating } = req.body;

  const updateData: InsertRating = {
    driverId,
    raceId,
    raterId,
    rating,
  };

  try {
    const existingRating = await db
      .select()
      .from(ratingsTable)
      .where(eq(ratingsTable.id, Number(id)));

    if (existingRating.length === 0) {
      res.status(404).json({ success: false, message: "Rating not found" });
      return;
    }

    await db
      .update(ratingsTable)
      .set(updateData)
      .where(eq(ratingsTable.id, Number(id)));

    res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete Rating by ID
router.delete("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingRating = await db
      .select()
      .from(ratingsTable)
      .where(eq(ratingsTable.id, Number(id)));

    if (existingRating.length === 0) {
      res.status(404).json({ success: false, message: "Rating not found" });
      return;
    }

    await db.delete(ratingsTable).where(eq(ratingsTable.id, Number(id)));

    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

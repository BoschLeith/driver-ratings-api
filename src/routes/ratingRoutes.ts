import { Request, Response, Router } from "express";

import { authenticateJWT } from "../middlewares/authMiddleware";
import {
  createRating,
  deleteRating,
  getAllRatings,
  getRatingById,
  updateRating,
} from "../services/ratingService";

const router = Router();

// Get All Ratings
router.get("/", async (req: Request, res: Response) => {
  try {
    const ratings = await getAllRatings();
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
    const rating = await getRatingById(Number(id));

    if (rating.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Rating not found" });
    }

    res.status(200).json({ success: true, data: rating });
  } catch (error) {
    console.error("Error fetching rating:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a New Rating
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { driverTeamId, raterId, rating } = req.body;

  if (!driverTeamId || !raterId || !rating) {
    return res.status(400).json({
      success: false,
      message: "Driver Team ID, Rater ID, and Rating are required",
    });
  }

  try {
    await createRating({ driverTeamId, raterId, rating });
    res.status(201).json({ message: "Rating created successfully" });
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update Rating by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { driverTeamId, raterId, rating } = req.body;

  if (!driverTeamId || !raterId || !rating) {
    return res.status(400).json({
      success: false,
      message: "Driver Team ID, Rater ID, and Rating are required",
    });
  }

  try {
    const existingRating = await getRatingById(Number(id));

    if (existingRating.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Rating not found" });
    }

    await updateRating(Number(id), { driverTeamId, raterId, rating });
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
    const existingRating = await getRatingById(Number(id));

    if (existingRating.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Rating not found" });
    }

    await deleteRating(Number(id));
    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

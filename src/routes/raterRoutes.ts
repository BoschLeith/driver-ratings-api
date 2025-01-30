import { Request, Response, Router } from "express";

import { authenticateJWT } from "../middlewares/authMiddleware";
import {
  createRater,
  deleteRater,
  getAllRaters,
  getRaterById,
  updateRater,
} from "../services/raterService";

const router = Router();

// Get All Raters
router.get("/", async (req: Request, res: Response) => {
  try {
    const raters = await getAllRaters();
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
    const rater = await getRaterById(Number(id));

    if (rater.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Rater not found" });
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

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  try {
    await createRater({ name });
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

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  try {
    const existingRater = await getRaterById(Number(id));

    if (existingRater.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Rater not found" });
    }

    await updateRater(Number(id), { name });
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
    const existingRater = await getRaterById(Number(id));

    if (existingRater.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Rater not found" });
    }

    await deleteRater(Number(id));
    res.status(200).json({ message: "Rater deleted successfully" });
  } catch (error) {
    console.error("Error deleting rater:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

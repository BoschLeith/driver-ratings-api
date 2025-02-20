import { Request, Response, Router } from "express";

import { authenticateJWT } from "../middlewares/authMiddleware";
import {
  createResult,
  deleteResult,
  getAllResults,
  getResultById,
  updateResult,
} from "../services/resultService";

const router = Router();

// Get All Results
router.get("/", async (req: Request, res: Response) => {
  try {
    const results = await getAllResults();
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Result by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result] = await getResultById(Number(id));

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Result not found" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching result:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a New Result
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { driverId, teamId, raceId, position } = req.body;

  if (!driverId || !teamId || !raceId || !position) {
    return res.status(400).json({
      success: false,
      message: "Driver ID, Team ID, Race ID, and Position are required",
    });
  }

  try {
    await createResult({ driverId, teamId, raceId, position });
    res.status(201).json({ message: "Result created successfully" });
  } catch (error) {
    console.error("Error creating result:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update Result by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { driverId, teamId, raceId, position } = req.body;

  if (!driverId || !teamId || !raceId || !position) {
    return res.status(400).json({
      success: false,
      message: "Driver ID, Team ID, Race ID, and Position are required",
    });
  }

  try {
    const [existingResult] = await getResultById(Number(id));

    if (!existingResult) {
      return res
        .status(404)
        .json({ success: false, message: "Result not found" });
    }

    await updateResult(Number(id), { driverId, teamId, raceId, position });
    res.status(200).json({ message: "Result updated successfully" });
  } catch (error) {
    console.error("Error updating result:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete Result by ID
router.delete("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [existingResult] = await getResultById(Number(id));

    if (!existingResult) {
      return res
        .status(404)
        .json({ success: false, message: "Result not found" });
    }

    await deleteResult(Number(id));
    res.status(200).json({ message: "Result deleted successfully" });
  } catch (error) {
    console.error("Error deleting result:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

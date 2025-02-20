import { Request, Response, Router } from "express";

import { authenticateJWT } from "../middlewares/authMiddleware";
import {
  createRace,
  deleteRace,
  getAllRaces,
  getRaceById,
  updateRace,
} from "../services/raceService";

const router = Router();

// Get All Races
router.get("/", async (req: Request, res: Response) => {
  try {
    const races = await getAllRaces();
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
    const [race] = await getRaceById(Number(id));

    if (!race) {
      return res
        .status(404)
        .json({ success: false, message: "Race not found" });
    }

    res.status(200).json({ success: true, data: race });
  } catch (error) {
    console.error("Error fetching race:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a New Race
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { grandPrixId, date } = req.body;

  if (!grandPrixId || !date) {
    return res
      .status(400)
      .json({ success: false, message: "Grand Prix ID and Date are required" });
  }

  try {
    await createRace({ grandPrixId, date });
    res.status(201).json({ message: "Race created successfully" });
  } catch (error) {
    console.error("Error creating race:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update Race by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { grandPrixId, date } = req.body;

  if (!grandPrixId || !date) {
    return res
      .status(400)
      .json({ success: false, message: "Grand Prix ID and Date are required" });
  }

  try {
    const [existingRace] = await getRaceById(Number(id));

    if (!existingRace) {
      return res
        .status(404)
        .json({ success: false, message: "Race not found" });
    }

    await updateRace(Number(id), { grandPrixId, date });
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
    const [existingRace] = await getRaceById(Number(id));

    if (!existingRace) {
      return res
        .status(404)
        .json({ success: false, message: "Race not found" });
    }

    await deleteRace(Number(id));
    res.status(200).json({ message: "Race deleted successfully" });
  } catch (error) {
    console.error("Error deleting race:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

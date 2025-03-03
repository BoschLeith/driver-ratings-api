import { Request, Response, Router } from "express";

import { authenticateJWT } from "../middlewares/authMiddleware";
import {
  createGrandPrix,
  deleteGrandPrix,
  getAllGrandPrixs,
  getGrandPrixById,
  getGrandPrixRaces,
  updateGrandPrix,
} from "../services/grandPrixService";

const router = Router();

// Get All Grand Prixs
router.get("/", async (req: Request, res: Response) => {
  try {
    const grandPrixs = await getAllGrandPrixs();
    res.status(200).json({ success: true, data: grandPrixs });
  } catch (error) {
    console.error("Error fetching Grand Prixs:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Grand Prix by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [grandPrix] = await getGrandPrixById(Number(id));

    if (!grandPrix) {
      return res
        .status(404)
        .json({ success: false, message: "Grand Prix not found" });
    }

    res.status(200).json({ success: true, data: grandPrix });
  } catch (error) {
    console.error("Error fetching Grand Prix:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a New Grand Prix
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  try {
    await createGrandPrix({ name });
    res.status(201).json({ message: "Grand Prix created successfully" });
  } catch (error) {
    console.error("Error creating Grand Prix:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update Grand Prix by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  try {
    const [existingGrandPrix] = await getGrandPrixById(Number(id));

    if (!existingGrandPrix) {
      return res
        .status(404)
        .json({ success: false, message: "Grand Prix not found" });
    }

    await updateGrandPrix(Number(id), { name });
    res.status(200).json({ message: "Grand Prix updated successfully" });
  } catch (error) {
    console.error("Error updating Grand Prix:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete Grand Prix by ID
router.delete("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [existingGrandPrix] = await getGrandPrixById(Number(id));

    if (!existingGrandPrix) {
      return res
        .status(404)
        .json({ success: false, message: "Grand Prix not found" });
    }

    await deleteGrandPrix(Number(id));
    res.status(200).json({ message: "Grand Prix deleted successfully" });
  } catch (error) {
    console.error("Error deleting Grand Prix:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Grand Prix by ID
router.get("/:id/races", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const races = await getGrandPrixRaces(Number(id));

    if (!races) {
      return res
        .status(404)
        .json({ success: false, message: "Grand Prix Races not found" });
    }

    res.status(200).json({ success: true, data: races });
  } catch (error) {
    console.error("Error fetching Grand Prix Races:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

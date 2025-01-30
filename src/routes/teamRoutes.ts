import { Request, Response, Router } from "express";

import { authenticateJWT } from "../middlewares/authMiddleware";
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
} from "../services/teamService";

const router = Router();

// Get All Teams
router.get("/", async (req: Request, res: Response) => {
  try {
    const teams = await getAllTeams();
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
    const [team] = await getTeamById(Number(id));

    if (!team) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found" });
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

  if (!name || !fullName) {
    return res
      .status(400)
      .json({ success: false, message: "Name and Full Name are required" });
  }

  try {
    await createTeam({ name, fullName });
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

  if (!name || !fullName) {
    return res
      .status(400)
      .json({ success: false, message: "Name and Full Name are required" });
  }

  try {
    const [existingTeam] = await getTeamById(Number(id));

    if (!existingTeam) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found" });
    }

    await updateTeam(Number(id), { name, fullName });
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
    const [existingTeam] = await getTeamById(Number(id));

    if (!existingTeam) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found" });
    }

    await deleteTeam(Number(id));
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

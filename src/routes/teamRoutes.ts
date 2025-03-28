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
    res.status(200).json({
      success: true,
      message: "Teams retrieved successfully",
      data: teams,
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
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
        .json({ success: false, message: "Team not found", data: null });
    }

    res.status(200).json({
      success: true,
      message: "Team retrieved successfully",
      data: team,
    });
  } catch (error) {
    console.error("Error fetching team:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
  }
});

// Create a New Team
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { name, fullName } = req.body;

  if (!name || !fullName) {
    return res.status(400).json({
      success: false,
      message: "Name and Full Name are required",
      data: null,
    });
  }

  try {
    const [team] = await createTeam({ name, fullName });
    res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: team,
    });
  } catch (error) {
    console.error("Error creating team:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
  }
});

// Update Team by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, fullName } = req.body;

  if (!name || !fullName) {
    return res.status(400).json({
      success: false,
      message: "Name and Full Name are required",
      data: null,
    });
  }

  try {
    const [existingTeam] = await getTeamById(Number(id));

    if (!existingTeam) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found", data: null });
    }

    const [team] = await updateTeam(Number(id), { name, fullName });
    res.status(200).json({
      success: true,
      message: "Team updated successfully",
      data: team,
    });
  } catch (error) {
    console.error("Error updating team:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
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
        .json({ success: false, message: "Team not found", data: null });
    }

    const [team] = await deleteTeam(Number(id));
    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
      data: team,
    });
  } catch (error) {
    console.error("Error deleting team:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
  }
});

export default router;

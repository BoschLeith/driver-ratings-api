import { Request, Response, Router } from "express";

import { authenticateJWT } from "../middlewares/authMiddleware";
import {
  createDriverTeam,
  deleteDriverTeam,
  getAllDriverTeams,
  getDriverTeamById,
  updateDriverTeam,
} from "../services/driverTeamService";

const router = Router();

// Get All Driver Teams
router.get("/", async (req: Request, res: Response) => {
  try {
    const driverTeams = await getAllDriverTeams();
    res.status(200).json({ success: true, data: driverTeams });
  } catch (error) {
    console.error("Error fetching driver teams:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Driver Team by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [driverTeam] = await getDriverTeamById(Number(id));

    if (!driverTeam) {
      return res
        .status(404)
        .json({ success: false, message: "Driver team not found" });
    }

    res.status(200).json({ success: true, data: driverTeam });
  } catch (error) {
    console.error("Error fetching driver team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a New Driver Team
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { driverId, teamId, raceId } = req.body;

  if (!driverId || !teamId || !raceId) {
    return res.status(400).json({
      success: false,
      message: "Driver ID, Team ID, and Race ID are required",
    });
  }

  try {
    await createDriverTeam({ driverId, teamId, raceId });
    res.status(201).json({ message: "Driver team created successfully" });
  } catch (error) {
    console.error("Error creating driver team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update Driver Team by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { driverId, teamId, raceId } = req.body;

  if (!driverId || !teamId || !raceId) {
    return res.status(400).json({
      success: false,
      message: "Driver ID, Team ID, and Race ID are required",
    });
  }

  try {
    const [existingDriverTeam] = await getDriverTeamById(Number(id));

    if (!existingDriverTeam) {
      return res
        .status(404)
        .json({ success: false, message: "Driver team not found" });
    }

    await updateDriverTeam(Number(id), { driverId, teamId, raceId });
    res.status(200).json({ message: "Driver team updated successfully" });
  } catch (error) {
    console.error("Error updating driver team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete Driver Team by ID
router.delete("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [existingDriverTeam] = await getDriverTeamById(Number(id));

    if (!existingDriverTeam) {
      return res
        .status(404)
        .json({ success: false, message: "Driver team not found" });
    }

    await deleteDriverTeam(Number(id));
    res.status(200).json({ message: "Driver team deleted successfully" });
  } catch (error) {
    console.error("Error deleting driver team:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

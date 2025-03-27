import { Request, Response, Router } from "express";

import { authenticateJWT } from "../middlewares/authMiddleware";
import { getDriversByIds } from "../services/driverService";
import {
  createRace,
  deleteRace,
  getAllRaces,
  getRaceById,
  updateRace,
} from "../services/raceService";
import { getResultsByYear } from "../services/resultService";

const router = Router();

// Get All Races
router.get("/", async (req: Request, res: Response) => {
  try {
    const races = await getAllRaces();
    res.status(200).json({
      success: true,
      message: "Races retrieved successfully",
      data: races,
    });
  } catch (error) {
    console.error("Error fetching races:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
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
        .json({ success: false, message: "Race not found", data: null });
    }

    res.status(200).json({
      success: true,
      message: "Race retrieved successfully",
      data: race,
    });
  } catch (error) {
    console.error("Error fetching race:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
  }
});

// Create a New Race
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { grandPrixId, date } = req.body;

  if (!grandPrixId || !date) {
    return res.status(400).json({
      success: false,
      message: "Grand Prix ID and Date are required",
      data: null,
    });
  }

  try {
    const [race] = await createRace({ grandPrixId, date });
    res.status(201).json({
      success: true,
      message: "Race created successfully",
      data: race,
    });
  } catch (error) {
    console.error("Error creating race:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
  }
});

// Update Race by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { grandPrixId, date } = req.body;

  if (!grandPrixId || !date) {
    return res.status(400).json({
      success: false,
      message: "Grand Prix ID and Date are required",
      data: null,
    });
  }

  try {
    const [existingRace] = await getRaceById(Number(id));

    if (!existingRace) {
      return res
        .status(404)
        .json({ success: false, message: "Race not found", data: null });
    }

    const [updatedRace] = await updateRace(Number(id), { grandPrixId, date });
    res.status(200).json({
      success: true,
      message: "Race updated successfully",
      data: updatedRace,
    });
  } catch (error) {
    console.error("Error updating race:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
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
        .json({ success: false, message: "Race not found", data: null });
    }

    const [deletedRace] = await deleteRace(Number(id));
    res.status(200).json({
      success: true,
      message: "Race deleted successfully",
      data: deletedRace,
    });
  } catch (error) {
    console.error("Error deleting race:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
  }
});

router.get("/:year/results", async (req: Request, res: Response) => {
  const { year } = req.params;

  try {
    const results = await getResultsByYear(Number(year));
    const uniqueDriverIds = [
      ...new Set(results.map((result) => result.driverId)),
    ];
    const drivers = await getDriversByIds(uniqueDriverIds);

    const data = Array.from(new Set(results.map((r) => r.raceId))).map(
      (raceId) => ({
        raceId: Number(raceId),
        drivers: Array.from(
          new Set(
            results.filter((r) => r.raceId === raceId).map((r) => r.driverId)
          )
        ).map((driverId) => {
          const driverResults = results.filter(
            (r) => r.driverId === driverId && r.raceId === raceId
          );
          return {
            id: driverId,
            driverCode: drivers.find((d) => d.id === driverId)?.driverCode,
            position: driverResults[0].position,
            ratings: driverResults.map((r) => ({
              rating: r.rating,
              raterName: r.name,
            })),
          };
        }),
      })
    );

    res
      .status(200)
      .json({ success: true, message: "Results retrieved successfully", data });
  } catch (error) {
    console.error("Error fetching results:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
  }
});

export default router;

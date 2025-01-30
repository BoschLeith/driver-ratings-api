import { Request, Response, Router } from "express";

import { authenticateJWT } from "../middlewares/authMiddleware";
import {
  createDriver,
  deleteDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
} from "../services/driverService";

const router = Router();

// Get All Drivers
router.get("/", async (req: Request, res: Response) => {
  try {
    const drivers = await getAllDrivers();
    res.status(200).json({ success: true, data: drivers });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Driver by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [driver] = await getDriverById(Number(id));

    if (!driver) {
      return res
        .status(404)
        .json({ success: false, message: "Driver not found" });
    }

    res.status(200).json({ success: true, data: driver });
  } catch (error) {
    console.error("Error fetching driver:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a New Driver
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  try {
    await createDriver({ name });
    res.status(201).json({ message: "Driver created successfully" });
  } catch (error) {
    console.error("Error creating driver:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update Driver by ID
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  try {
    const [existingDriver] = await getDriverById(Number(id));

    if (!existingDriver) {
      return res
        .status(404)
        .json({ success: false, message: "Driver not found" });
    }

    await updateDriver(Number(id), { name });
    res.status(200).json({ message: "Driver updated successfully" });
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete Driver by ID
router.delete("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [existingDriver] = await getDriverById(Number(id));

    if (!existingDriver) {
      return res
        .status(404)
        .json({ success: false, message: "Driver not found" });
    }

    await deleteDriver(Number(id));

    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    console.error("Error deleting driver:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

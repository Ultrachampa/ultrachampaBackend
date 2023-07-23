import { Router } from "express";
import {
  createRace,
  deleteRaceById,
  editRaceData,
  editRaceDiscount,
  getRaces,
  updateRaceAvailability,
  // updateRacePriceById,
} from "../controllers/race.controllers";

import { verifyToken, isAdmin } from "../middlewares/verifyToken";
// import { payProduct } from "../controllers/mp.controllers";
const router = Router();

router.post("/createRace", [verifyToken, isAdmin], createRace);

router.get("/getRaces", getRaces);

router.delete("/deleteRace/:id", [verifyToken, isAdmin], deleteRaceById);

router.patch(
  "/modifyRaceDiscount/:id",
  [verifyToken, isAdmin],
  editRaceDiscount
);

router.patch("/modifyRaceAvailability/:id", [verifyToken, isAdmin], updateRaceAvailability);

// router.post("/pay/:id", verifyToken, payProduct);

router.put("/modifyRace/:id", [verifyToken, isAdmin], editRaceData);

export default router;

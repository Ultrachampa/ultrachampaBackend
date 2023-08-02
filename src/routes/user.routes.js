import { Router } from "express";
import {
  addUserToRace,
  getUsers,
  getRegistrationCount,
  getUserRaceData,
  payingUsersTest,
  removeUserRace,
} from "../controllers/user.controllers";
import { verifyToken, isAdmin } from "../middlewares/verifyToken";
const router = Router();

router.get("/registeredUsers", [verifyToken, isAdmin], getRegistrationCount);

router.post("/getUsers", [verifyToken], getUsers);

router.get("/getUserRaceData/:userId", verifyToken, getUserRaceData);

router.post("/addUserToRace/:userId/:raceId", verifyToken, addUserToRace);

router.post("/confirmPayment", payingUsersTest);

router.put("/removeUserRace/:userId", verifyToken, removeUserRace);

export default router;

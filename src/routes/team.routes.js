import { Router } from "express";
import { getTeams, verifyTeam } from "../controllers/team.controllers";

import { verifyToken, isAdmin } from "../middlewares/verifyToken";

const router = Router();

router.post("/getTeams", [verifyToken, isAdmin], getTeams);
router.post("/verifyTeam", [verifyToken], verifyTeam);

export default router;

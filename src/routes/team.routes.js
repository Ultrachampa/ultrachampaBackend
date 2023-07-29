import { Router } from "express";
import { getTeams } from "../controllers/team.controllers";

import { verifyToken, isAdmin } from "../middlewares/verifyToken";

const router = Router();

router.post("/getTeams", [verifyToken, isAdmin], getTeams);

export default router;

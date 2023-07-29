import { Router } from "express";
import { getTeamMembers } from "../controllers/teamMembers.controllers";
import { verifyToken, isAdmin } from "../middlewares/verifyToken";

const router = Router();

router.post("/getTeamMembers", [verifyToken, isAdmin], getTeamMembers);

export default router;

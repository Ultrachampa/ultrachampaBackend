import { Router } from "express";
import { documentCount } from "../controllers/stats.controllers";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/getStats", [verifyToken], documentCount);
export default router;
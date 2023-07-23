import { Router } from "express";
import { getFees } from "../controllers/fee.controllers";

import { verifyToken, isAdmin } from "../middlewares/verifyToken";

const router = Router();

router.post("/getFees", [verifyToken, isAdmin], getFees);

export default router;

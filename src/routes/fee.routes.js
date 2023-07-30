import { Router } from "express";
import { getFees } from "../controllers/fee.controllers";

import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/getFees", [verifyToken], getFees);

export default router;

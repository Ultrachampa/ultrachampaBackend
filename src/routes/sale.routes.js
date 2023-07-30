import { Router } from "express";
import { createSale, getSales } from "../controllers/sale.controllers";

import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/createSale", [verifyToken], createSale);
router.post("/getSale", [verifyToken], getSales);

export default router;

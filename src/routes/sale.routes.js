import { Router } from "express";
import { createSale, getSales } from "../controllers/sale.controllers";

import { verifyToken, isAdmin } from "../middlewares/verifyToken";

const router = Router();

router.post("/createSale", [verifyToken, isAdmin], createSale);
router.post("/getSale", [verifyToken, isAdmin], getSales);

export default router;

import { Router } from "express";
import { verifyToken, isAdmin } from "../middlewares/verifyToken";
import { payFee, receiveWebhook } from "../controllers/mp.controllers";

const router = Router();

router.post("/paymentFees", [verifyToken, isAdmin], payFee);
router.get("/webhookMP/:feeID", [verifyToken, isAdmin], receiveWebhook);
router.get("/success", [verifyToken, isAdmin], receiveWebhook);
router.get("/failureUrl", [verifyToken, isAdmin], receiveWebhook);
router.get("/pendingUrl", [verifyToken, isAdmin], receiveWebhook);

export default router;

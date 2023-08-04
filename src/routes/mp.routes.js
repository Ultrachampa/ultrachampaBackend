import { Router } from "express";
import { verifyToken, isAdmin } from "../middlewares/verifyToken";
import { payFee, receiveWebhook } from "../controllers/mp.controllers";

const router = Router();

router.post("/paymentFees", [verifyToken], payFee);
router.post("/webhookMP/:feeID", receiveWebhook);
router.get("/success", [verifyToken], receiveWebhook);
router.get("/failureUrl", [verifyToken], receiveWebhook);
router.get("/pendingUrl", [verifyToken], receiveWebhook);

export default router;

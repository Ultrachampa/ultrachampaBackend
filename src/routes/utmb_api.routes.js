import { Router } from "express";
import {
  memberSimple,
  checkActiveStatus,
  getTokenApi,
  testing
} from "../controllers/utmb_api.controllers";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/memberSimple", [verifyToken], memberSimple);
router.post("/checkActiveStatus", [verifyToken], checkActiveStatus);
router.get("/getTokenApi", [verifyToken], getTokenApi);
router.get("/testing", [verifyToken], testing);

export default router;

import { Router } from "express";
import {
  memberSimple,
  checkActiveStatus,
  getTokenApi,
} from "../controllers/utmb_api.controllers";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/memberSimple", [verifyToken], memberSimple);
router.post("/checkActiveStatus", [verifyToken], checkActiveStatus);
router.get("/getTokenApi", [verifyToken], getTokenApi);

export default router;

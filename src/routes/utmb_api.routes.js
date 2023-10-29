import { Router } from "express";
import {
  memberSimple,
  checkActiveStatus,
} from "../controllers/utmb_api.controllers";

const router = Router();

router.post("/memberSimple", [verifyToken], memberSimple);
router.post("/checkActiveStatus", [verifyToken], checkActiveStatus);

export default router;

import { Router } from "express";
import { test } from "../controllers/test.controllers";

const router = Router();

router.post("/test", test);

export default router;

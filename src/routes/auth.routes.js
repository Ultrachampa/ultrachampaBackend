import { Router } from "express";
import {
  deleteUser,
  editDataFromUser,
  enterResetToken,
  forgotPassword,
  refreshToken,
  resetPassword,
  userLogin,
  userRegister,
} from "../controllers/auth.controllers";
import { checkExistingRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/verifyToken";
const router = Router();

router.post("/register", checkExistingRoles, userRegister);

router.post("/login", userLogin);

router.post("/token/refresh", refreshToken);

router.put("/editUser/:id", verifyToken, editDataFromUser);

router.delete("/deleteUser/:id", verifyToken, deleteUser);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/enter-token", enterResetToken);

router.post("/reset-password", resetPassword);


export default router;

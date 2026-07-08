import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserSchema, loginUserSchema } from "../validations/auth.validator";
const router = Router();

// create user
router.post("/register", validate(createUserSchema), authController.createUser);
router.post("/login", validate(loginUserSchema), authController.login);

export default router;
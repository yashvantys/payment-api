import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserSchema, loginUserSchema } from "../validations/auth.validator";
const router = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
// create user
router.post("/register", validate(createUserSchema), authController.createUser);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", validate(loginUserSchema), authController.login);

export default router;
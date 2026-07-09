import { Router } from "express";
import paymentController from "../controllers/payment.controller";
import { getPaymentByIdSchema, validate } from "../middleware/validate.middleware";
import { createPaymentSchema, updatePaymentSchema } from "../validations/payment.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
const router = Router();

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     description: Returns all payments.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payments retrieved successfully.
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
// Get All Payments
router.get("/", authenticate, authorize("ADMIN", "USER"), paymentController.findAll);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment not found
 */
// Get Payment By Id
router.get("/:id", authenticate, authorize("ADMIN", "USER"), validate(getPaymentByIdSchema), paymentController.findById);
/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create Payment
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment created successfully
 */
// create Payment
router.post("/", authenticate, authorize("ADMIN"), validate(createPaymentSchema), paymentController.createPayment);
/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete payment
 *     description: Delete a payment by ID.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Payment not found
 */
router.delete("/:id", authenticate, authorize("ADMIN"), validate(getPaymentByIdSchema), paymentController.deletePayment)
/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update payment
 *     description: Update an existing payment by ID.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Payment not found
 */
router.put("/:id", authenticate, authorize("ADMIN"), validate(updatePaymentSchema), paymentController.updatePayment)

export default router;
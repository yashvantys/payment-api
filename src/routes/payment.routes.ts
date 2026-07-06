import { Router } from "express";
import paymentController from "../controllers/payment.controller";
import { getPaymentByIdSchema, validate } from "../middleware/validate.middleware";
import { createPaymentSchema } from "../validations/payment.validator";
const router = Router();


// Get All Payments
router.get("/", paymentController.findAll);

// Get Payment By Id
router.get("/:id", validate(getPaymentByIdSchema), paymentController.findById);
// create Payment
router.post("/", validate(createPaymentSchema), paymentController.createPayment);

export default router;
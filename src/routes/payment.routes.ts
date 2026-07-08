import { Router } from "express";
import paymentController from "../controllers/payment.controller";
import { getPaymentByIdSchema, validate } from "../middleware/validate.middleware";
import { createPaymentSchema, updatePaymentSchema } from "../validations/payment.validator";
import { authenticate } from "../middleware/auth.middleware";
const router = Router();


// Get All Payments
router.get("/", authenticate, paymentController.findAll);

// Get Payment By Id
router.get("/:id", authenticate, validate(getPaymentByIdSchema), paymentController.findById);
// create Payment
router.post("/", authenticate, validate(createPaymentSchema), paymentController.createPayment);

router.delete("/:id", authenticate, validate(getPaymentByIdSchema), paymentController.deletePayment)
router.put("/:id", authenticate, validate(updatePaymentSchema), paymentController.updatePayment)

export default router;
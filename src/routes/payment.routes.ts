import { Router } from "express";
import paymentController from "../controllers/payment.controller";
import { getPaymentByIdSchema, validate } from "../middleware/validate.middleware";
import { createPaymentSchema, updatePaymentSchema } from "../validations/payment.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
const router = Router();


// Get All Payments
router.get("/", authenticate, authorize("ADMIN", "USER"), paymentController.findAll);

// Get Payment By Id
router.get("/:id", authenticate, authorize("ADMIN", "USER"), validate(getPaymentByIdSchema), paymentController.findById);
// create Payment
router.post("/", authorize("ADMIN"), authenticate, validate(createPaymentSchema), paymentController.createPayment);

router.delete("/:id", authenticate, authorize("ADMIN"), validate(getPaymentByIdSchema), paymentController.deletePayment)
router.put("/:id", authenticate, authorize("ADMIN"), validate(updatePaymentSchema), paymentController.updatePayment)

export default router;
import { Request, Response, NextFunction } from "express";
import paymentService from "../services/payment.service";
import { ApiError } from "../utils/ApiError";

class PaymentController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {   
            const user = res.locals.user;                       
            const payments = await paymentService.findAll();
            return res.status(200).json({
                success: true,
                data: payments,
            });
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {           
            const id = Number(req.params.id)
            if (Number.isNaN(id) || id <= 0) {
                throw new ApiError(400, "Payment id must be a positive number");
            }
            const payment = await paymentService.findById(id);
            if (!payment) {
                throw new ApiError(404, "Payment not found");
            }
            return res.status(200).json({
                success: true,
                data: payment,
            });
        } catch (err) {
            next(err)
        }
    }
    async createPayment(req: Request, res: Response, next: NextFunction) {
        try {
            const payment = await paymentService.createPayment(req.body)
            if (!payment) {
                throw new ApiError(404, "Payment not created");
            }
            return res.status(200).json({
                success: true,
                data: payment,
            });
        } catch (error) {
            next(error)
        }
    }
    async updatePayment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            if (Number.isNaN(id) || id <= 0) {
                throw new ApiError(400, "Payment id must be a positive number");
            }
            const payment = await paymentService.updatePayment(id, req.body)
            if (!payment) {
                throw new ApiError(404, "Payment not updated");
            }
            return res.status(200).json({
                success: true,
                data: payment,
            });
        } catch (error) {
            next(error)
        }
    }
    async deletePayment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            if (Number.isNaN(id) || id <= 0) {
                throw new ApiError(400, "Payment id must be a positive number");
            }
            const payment = paymentService.deletePayment(id)
            return res.status(200).json({
                success: true,
                data: payment,
            });
        } catch (error) {
            next(error)
        }

    }
}

export default new PaymentController()
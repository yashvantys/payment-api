import { Request, Response, NextFunction } from "express";
import { ZodSchema, z } from "zod";

export const validate =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    body: req.body,
                    params: req.params,
                    query: req.query,
                });

                next();
            } catch (error: any) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.issues,
                });
            }
        };

export const getPaymentByIdSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int("Payment id must be an integer")
            .positive("Payment id must be greater than 0"),
    }),
});
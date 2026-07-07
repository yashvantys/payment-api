import { z } from "zod";

export const createPaymentSchema = z.object({
    body: z.object({
        paymentId: z.string().min(1, "Payment Id is required"),
        amount: z.coerce
            .number()
            .positive("Amount must be greater than zero"),
        currency: z.string().length(3, "Currency must be a 3-letter code"),
        payerName: z.string().min(3, "Payer name is required"),
        payerEmail: z.email("Invalid email address"),
        paymentMethod: z.enum([
            "CARD",
            "UPI",
            "NET_BANKING",
            "WALLET",
        ]),
    }),
});

export const updatePaymentSchema = z.object({
    body: z.object({
        status:z.enum([
            "SUCCESS",
            "FAILED"
        ])
    })
})
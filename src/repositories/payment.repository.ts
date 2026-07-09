import prisma from "../config/database";
import { Payment, Prisma } from "@prisma/client";

export class PaymentRepository {
    async findAll(): Promise<Payment[]> {
        return prisma.payment.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async findById(id: number) {
        return prisma.payment.findUnique({
            where: { id }
        });
    }

    async createPayment(data: Prisma.PaymentCreateInput) {
        return prisma.payment.create({
            data,
        });
    }

    async deletePayment(id: number) {
        try {
            return await prisma.payment.delete({
                where: { id }
            });
        } catch (error: any) {
            if (error.code === "P2025") {
                throw new Error("Payment not found");
            }
            throw error;
        }
    }

    async updatePayment(id: number, data: Prisma.PaymentUpdateInput) {
        return prisma.payment.update({ where: { id }, data })
    }
}

export default new PaymentRepository();
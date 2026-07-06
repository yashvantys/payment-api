import { Prisma } from "@prisma/client";
import paymentRepository from "../repositories/payment.repository";

class PaymentService {
    async findAll() {
        return paymentRepository.findAll();
    }
    async findById(id: number) {
        return paymentRepository.findById(id)
    }

    async createPayment(data:Prisma.PaymentCreateInput) {
        return paymentRepository.createPayment(data)
    }
}

export default new PaymentService();
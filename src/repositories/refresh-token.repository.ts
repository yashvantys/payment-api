import prisma from "../config/database";
import { Prisma } from "@prisma/client";


export class RefreshTokenRepository {
    async create(data: Prisma.RefreshTokenCreateInput) {
        return prisma.refreshToken.create({
            data,
        });
    }

    async revokeToken(id: string) {
        return prisma.refreshToken.update({
            where: { id },
            data: {
                revoked: true
            }
        })
    }
}


export default new RefreshTokenRepository();
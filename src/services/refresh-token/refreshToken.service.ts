import { Prisma } from "@prisma/client";
import refreshTokenRepository from "../../repositories/refresh-token.repository";
import { hashToken } from "../../utils/jwt";


interface StoreRefreshTokenDto {
    refreshToken: string;
    userId: number;
    expiresAt: Date;
}
class RefreshTokenService {
    async storeRefreshToken(
        dto: StoreRefreshTokenDto
    ) {
        const { refreshToken, expiresAt, userId } = dto
        const tokenHash = hashToken(refreshToken);
        return refreshTokenRepository.create({
            tokenHash,
            expiresAt,
            user: {
                connect: {
                    id: userId,
                },
            },
        });
    }

    async revoke(token:string) {

    }
}

export default new RefreshTokenService()
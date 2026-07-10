import { Prisma } from "@prisma/client";
import userRepository from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../utils/password";
import { ApiError } from "../utils/ApiError";
import { generateRefreshToken, generateToken } from "../utils/jwt";
import { urlencoded } from "express";
class AuthService {
    async createUser(data: Prisma.UserCreateInput) {
        const hashedPassword = await hashPassword(data.password);
        return userRepository.createUser({
            ...data,
            password: hashedPassword
        })
    }
    async login(email: string, password: string) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }
        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            throw new ApiError(401, "Invalid email or password");
        }
        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });
        const refreshToken = generateRefreshToken(
            {
                id: user.id,                
            }
        )
        return {
            user,
            token,
            refreshToken
        };
    }
}

export default new AuthService();
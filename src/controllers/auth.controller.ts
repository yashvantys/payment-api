import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import { ApiError } from "../utils/ApiError";

class AuthController {
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.createUser(req.body)
            if (!user) {
                throw new ApiError(404, "User not created");
            }
            return res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            next(error)
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password)
            if (!user) {
                throw new ApiError(404, "User not loged in");
            }
            return res.status(200).json({
                success: true,
                token: user?.token,
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController()
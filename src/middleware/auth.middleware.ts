import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new ApiError(401, "Authorization header is missing");
        }
        if (!authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Invalid authorization format");
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        // Attach user to request
        req.body = decoded;

        next();
    } catch (error) {
        next(error);
    }
};
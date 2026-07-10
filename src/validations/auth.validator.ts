import { z } from "zod";


export const createUserSchema = z.object({
    body: z.object({
        firstName: z.string().min(3, "First name is required"),
        lastName: z.string().min(3, "Last name is required"),
        email: z.email("Invalid email address"),
        password: z.string().min(5, "Password is required"),
        role: z.enum([
            "USER",
            "ADMIN",
            "VIEWER",
        ]),
    }),
});


export const loginUserSchema = z.object({
    body: z.object({
        email: z.email("Invalid email address"),
        password: z.string().min(5, "Password is required"),
    }),
});

export const refershTokenSchema = z.object({
    body: z.object({
        refreshToken: z.string("Refresh Token is required"),        
    }),
});
import { z } from "zod";
import { dateSchema, InferBody } from "./helpers.dto";

export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/,
        "Password must contain at least one special character"
    );


export const registerDto = z.object({
    email: z.email("Invalid email"),
    password: passwordSchema,
    name: z.string().min(3, "Name must be at least 3 characters long"),
})


export const loginDto = z.object({
    email: z.email("Invalid email"),
    password: passwordSchema,
})


export const userResponse = z.object({
    email: z.email("Invalid email"),
    name: z.string().min(3, "Name must be at least 3 characters long"),
    id: z.string(),
    createdAt: dateSchema,
    updatedAt: dateSchema,
})

export type LoginDto = InferBody<typeof loginDto>;
export type RegisterDto = InferBody<typeof registerDto>;
export type UserResponse = InferBody<typeof userResponse>;
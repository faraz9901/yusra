import { z } from "zod";

export const ApiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) => {
    return z.object({
        success: z.literal(true),
        data: dataSchema,
        message: z.string().default("Ok"),
        status: z.number().default(200)
    });
}
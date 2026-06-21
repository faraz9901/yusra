import { z } from "zod";
import { ErrorCodeSchema } from "./error-code";

export class ApiError extends Error {
    constructor(
        public readonly code: z.infer<typeof ErrorCodeSchema>,

        public readonly statusCode: number,

        message: string,

        public readonly details?: unknown,
    ) {
        super(message);
    }

    static isApiError(error: unknown) {
        return error instanceof ApiError;
    }
}


export const ApiFailureSchema = z.object({
    success: z.literal(false),
    error: z.object({
        code: ErrorCodeSchema,
        message: z.string(),
        status: z.number().optional(),
        details: z.any().optional()
    })
});



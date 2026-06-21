import { ApiError } from "@yusra/shared/core";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export const errorHandler = (
    error: unknown,
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    request.log.error(error);

    if (ApiError.isApiError(error)) {
        return reply.status(error.statusCode).send({
            success: false,
            error: {
                code: error.code,
                message: error.message,
                status: error.statusCode,
                details: error.details
            }
        });
    }

    if (error instanceof ZodError) {
        return reply.status(400).send({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: error.issues[0].message,
                details: error
            }
        });
    }

    return reply.status(500).send({
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong"
        }
    });
}

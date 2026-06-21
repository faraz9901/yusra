import { ApiFailureSchema, ApiSuccessSchema } from "@yusra/shared/core";
import {
    FastifyReply,
    FastifyRequest,
} from "fastify";
import { z } from "zod";

export interface RouteSchema {
    params?: z.ZodTypeAny;
    query?: z.ZodTypeAny;
    body?: z.ZodTypeAny;
    response?: z.ZodTypeAny
}

const ApiResponseSchema = (response: z.ZodTypeAny) => z.union([
    ApiSuccessSchema(response),
    ApiFailureSchema,
]);

export const requestValidate = async (request: FastifyRequest) => {
    const schema = (request.routeOptions.config as { schema?: RouteSchema })?.schema;

    if (!schema) return;

    if (schema.params) {
        request.params = schema.params.parse(request.params);
    }

    if (schema.query) {
        request.query = schema.query.parse(request.query);
    }

    if (schema.body) {
        request.body = schema.body.parse(request.body);
    }
}



export const responseValidate = async (request: FastifyRequest, reply: FastifyReply, payload: unknown): Promise<unknown> => {
    const schema = (request.routeOptions.config as { schema?: RouteSchema })?.schema?.response;

    if (!schema) {
        return payload;
    }

    schema.parse(payload);

    return payload;
};


export const setValidationParams = (schema: RouteSchema) => {

    if (schema.response) {
        schema.response = ApiResponseSchema(schema.response);
    }

    return {
        config: {
            schema: schema
        }
    }
}
import { ApiFailureSchema, ApiSuccessSchema } from "@yusra/shared/core";
import {
    FastifyReply,
    FastifyRequest,
} from "fastify";
import { z } from "zod";
import { createSchema } from "zod-openapi";

export interface RouteSchema {
    params?: z.ZodTypeAny;
    query?: z.ZodTypeAny;
    body?: z.ZodTypeAny;
    response?: z.ZodTypeAny;
    description?: string;
    tags?: string[];
    summary?: string;
}

const ApiResponseSchema = (response: z.ZodTypeAny) => z.union([
    ApiSuccessSchema(response),
    ApiFailureSchema,
]);

export const requestValidate = async (request: FastifyRequest) => {
    const schema = request.routeOptions.config.validationSchema;

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
    const schema = request.routeOptions.config.validationSchema?.response;

    if (!schema) {
        return payload;
    }

    schema.parse(payload);

    return payload;
};


export const setValidationParams = (schema: RouteSchema) => {

    const openApiSchema: Record<string, unknown> = {}

    if (schema.summary) {
        openApiSchema.summary = schema.summary
    }

    if (schema.description) {
        openApiSchema.description = schema.description
    }

    if (schema.tags) {
        openApiSchema.tags = schema.tags
    }

    if (schema.params) {
        openApiSchema.params = createSchema(schema.params).schema
    }

    if (schema.query) {
        openApiSchema.query = createSchema(schema.query).schema
    }

    if (schema.body) {
        openApiSchema.body = createSchema(schema.body).schema
    }

    if (schema.response) {

        const responseSchema = ApiResponseSchema(schema.response)

        const openApiResponseSchema = createSchema(responseSchema).schema;

        openApiSchema.response = {
            200: openApiResponseSchema
        }

        schema.response = responseSchema
    }


    return {
        schema: openApiSchema,
        config: {
            validationSchema: schema,
        },
    };
};
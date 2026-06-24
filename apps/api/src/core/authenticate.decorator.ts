import jwt from "@fastify/jwt";
import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { configService } from "./config.service";

export const authenticate = fp(async function (fastify, opts) {
    fastify.register(jwt, {
        secret: configService.getValue("JWT_SECRET")
    })

    fastify.decorate("authenticate", async function (request: FastifyRequest) {
        await request.jwtVerify()
    })
})
import "fastify";

declare module "fastify" {
    interface FastifyContextConfig {
        validationSchema?: import("../plugins/routeConfig").RouteSchema;
    }
}
import requestContext from "@fastify/request-context";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import { configService } from "./core/config.service";
import { logger, requestLogger, responseLogger } from "./core/logger.service";
import { errorHandler } from "./plugins/error-handler";
import { requestValidate, responseValidate } from "./plugins/routeConfig";
import indexRoutes from "./routes";

const app = Fastify();

app.register(requestContext, {
    defaultStoreValues: (request) => ({
        requestId: request.id,
    })
})

app.addHook("onRequest", requestLogger);

app.addHook("onResponse", responseLogger);


app.setErrorHandler(errorHandler);

app.addHook("preValidation", requestValidate)

app.addHook("preSerialization", responseValidate)


app.register(swagger, {
    openapi: {
        openapi: "3.1.0",
        info: {
            title: "Yusra API",
            description: "API Documentation",
            version: "1.0.0",
        },
    },
});

app.register(swaggerUi, {
    routePrefix: "/docs",
});




// Register routes
app.register(indexRoutes);


app.listen({ port: configService.getPort(), host: '0.0.0.0' }, function (err, address) {
    if (err) {
        logger.error("Unable to start server", err)
        process.exit(1)
    }
    logger.info(`Server listening at ${address}`)
})
import requestContext from "@fastify/request-context";
import Fastify from "fastify";
import { configService } from "./core/config.service";
import { logger, requestLogger, responseLogger } from "./core/logger.service";
import { errorHandler } from "./plugins/error-handler";
import { requestValidate, responseValidate } from "./plugins/validation";
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



// Register routes
app.register(indexRoutes);


app.listen({ port: configService.getPort(), host: '0.0.0.0' }, function (err, address) {
    if (err) {
        logger.error("Unable to start server", err)
        process.exit(1)
    }
    logger.info(`Server listening at ${address}`)
})
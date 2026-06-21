import Fastify from "fastify";
import { configService } from "./core/config.service";
import { errorHandler } from "./plugins/error-handler";
import { requestValidate, responseValidate } from "./plugins/validation";
import indexRoutes from "./routes";

const app = Fastify();

app.setErrorHandler(errorHandler);

app.addHook("preValidation", requestValidate)

app.addHook("preSerialization", responseValidate)

app.register(indexRoutes);


app.listen({ port: configService.getPort(), host: '0.0.0.0' }, function (err, address) {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
import { FastifyInstance } from "fastify";
import { BaseService } from "../core/base.service";
import { setValidationParams } from "../plugins/validation";
import { emptyReponseSchema } from "../utils/empty.response";

async function indexRoutes(fastify: FastifyInstance) {
    fastify.get('/', setValidationParams({ response: emptyReponseSchema, }), async () => {
        const baseService = new BaseService();

        return baseService.sendOk(null, "Server is running");
    });

}


export default indexRoutes;
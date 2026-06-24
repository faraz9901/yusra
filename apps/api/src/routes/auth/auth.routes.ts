import { LoginDto, loginDto, registerDto } from "@yusra/shared/dtos/auth.dto";
import { FastifyInstance } from "fastify";
import { setValidationParams } from "../../plugins/routeConfig";
import { emptyReponseSchema } from "../../utils/empty.response";
import { authService } from "./auth.service";

async function authRoutes(fastify: FastifyInstance) {

    fastify.post<{ Body: LoginDto }>('/login',
        setValidationParams({
            summary: 'Login User',
            tags: ['Auth', 'Login'],
            body: loginDto,
            response: emptyReponseSchema,
        }),
        async (request) => {
            await authService.login(request.body.email, request.body.password);


        })


    fastify.post('/register',
        setValidationParams({
            summary: 'Register User',
            tags: ['Auth', 'Register'],
            response: emptyReponseSchema,
            body: registerDto,
        }),
        async () => {

        })


    fastify.get("/me",
        setValidationParams({
            summary: "Get Current User",
            tags: ["Auth", "Me"],
        }),
        async () => {

        }
    )

    fastify.post("/logout",
        setValidationParams({
            summary: "Logout User",
            tags: ["Auth", "Logout"],
            response: emptyReponseSchema,
        }),
        async () => {

        }
    )
}


export default authRoutes;
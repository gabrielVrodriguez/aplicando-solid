import { FastifyInstance } from "fastify";
import { makeAuthenticateController } from "./factories/make-authenticate";
import { makeRefreshTokenController } from "./factories/make-refresh-token";
import { authenticateDto } from "./dtos/authenticate";
import { ZodTypeProvider } from "fastify-type-provider-zod";


export async function authenticateRoutes(app: FastifyInstance) {

    const authenticateController = makeAuthenticateController()
    const refreshTokenController = makeRefreshTokenController()

    app.withTypeProvider<ZodTypeProvider>().post('/', {
        schema: {
            body: authenticateDto
        },
    }, (request, reply) => {
        return authenticateController.handle(request, reply)
    })

    app.patch('/refresh', (request, reply) => {
        return refreshTokenController.handle(request, reply)
    })
}
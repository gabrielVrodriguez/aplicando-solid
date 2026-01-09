import { FastifyInstance } from "fastify";
import { makeAuthenticateController } from "./factories/make-authenticate";
import { authenticateDto } from "./dtos/authenticate";
import { ZodTypeProvider } from "fastify-type-provider-zod";


export async function authenticateRoutes(app: FastifyInstance) {


    const authenticateController = makeAuthenticateController()

    app.withTypeProvider<ZodTypeProvider>().post('/', {
        schema: {
            body: authenticateDto
        },
    }, (request, reply) => {
        return authenticateController.handle(request, reply)
    })
}
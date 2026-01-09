import { FastifyReply, FastifyRequest } from "fastify";
import { AuthenticateUseCase } from "../use-cases/authenticate";
import { AuthenticateSchema } from "../dtos/authenticate";
import { InvalidCredentialError } from "../errors/invalid-credentials";

export class AuthenticateController {

    constructor(private authenticateUseCase: AuthenticateUseCase) { }

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const data = request.body as AuthenticateSchema

        try {
           await this.authenticateUseCase.execute(data)
        } catch (error) {
            if(error instanceof InvalidCredentialError){
                return reply.status(400).send({ message: error.message })
            }
           throw error
        }
    }
}

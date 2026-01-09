import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id";
import { GetUserByIdSchema } from "../dtos/get-user-by-id";

export class GetUserByIdController {

    constructor(private getUserByIdUseCase: GetUserByIdUseCase) { }

    async handle(request: FastifyRequest, reply: FastifyReply) {
        const data = request.params as GetUserByIdSchema

        try {
            const user = await this.getUserByIdUseCase.execute(data.id)
            return reply.status(200).send(user)
        } catch (error) {
            console.error(error)
            return reply.status(500).send({ error })
        }

    }
}
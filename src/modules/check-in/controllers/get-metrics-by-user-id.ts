import { FastifyReply, FastifyRequest } from "fastify";
import { GetMetricsByUserIdUseCase } from "../use-cases/get-metrics-by-user-id";



export class GetMetricsByUserIdController {
    constructor (private getMetricsByUserIdUseCase: GetMetricsByUserIdUseCase) {}

    async handle (request: FastifyRequest, reply: FastifyReply) {

        const count = await this.getMetricsByUserIdUseCase.execute({
            user_id: request.user.sub
        })

        return reply.status(200).send({ count })
    }
}

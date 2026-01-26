import { FastifyReply, FastifyRequest } from "fastify";
import { GetMetricsByUserIdUseCase } from "../use-cases/get-metrics-by-user-id";
import { GetMetricsByUserIdSchema } from "../dtos/get-metrics-by-user-id";



export class GetMetricsByUserIdController {
    constructor (private getMetricsByUserIdUseCase: GetMetricsByUserIdUseCase) {}

    async handle (request: FastifyRequest, reply: FastifyReply) {

        const data = request.body as GetMetricsByUserIdSchema

        await this.getMetricsByUserIdUseCase.execute(data)

        return reply.status(201).send()
    }
}

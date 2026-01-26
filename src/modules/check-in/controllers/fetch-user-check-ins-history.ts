import { FastifyReply, FastifyRequest } from "fastify";
import { FetchUserCheckInsHistoryUseCase } from "../use-cases/fetch-user-check-ins-history";
import { FetchUserCheckInsHistorySchema } from "../dtos/fetch-user-check-ins-history";



export class FetchUserCheckInsHistoryController {
    constructor(private fetchUserCheckInsHistoryUseCase: FetchUserCheckInsHistoryUseCase) { }

    async handle (request: FastifyRequest, reply: FastifyReply) {

        const data = request.body as FetchUserCheckInsHistorySchema

        await this.fetchUserCheckInsHistoryUseCase.execute(data)

        return reply.status(200).send()
    }
}

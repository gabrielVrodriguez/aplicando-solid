import { FastifyReply, FastifyRequest } from "fastify";
import { FetchUserCheckInsHistoryUseCase } from "../use-cases/fetch-user-check-ins-history";
import { FetchUserCheckInsHistorySchema } from "../dtos/fetch-user-check-ins-history";



export class FetchUserCheckInsHistoryController {
    constructor(private fetchUserCheckInsHistoryUseCase: FetchUserCheckInsHistoryUseCase) { }

    async handle (request: FastifyRequest, reply: FastifyReply) {

        const { page } = request.query as FetchUserCheckInsHistorySchema

        const checkIns = await this.fetchUserCheckInsHistoryUseCase.execute({
            user_id: request.user.sub,
            page
        })

        return reply.status(200).send(checkIns)
    }
}


import { SearchGymsUseCase } from "../use-cases/search-gyms";
import { FastifyReply, FastifyRequest } from "fastify";
import { SearchGymSchema } from "../dtos/search-gyms";


export class SearchGymsController {

    constructor (private searchGymsUseCase: SearchGymsUseCase) {}

    async handle (request: FastifyRequest, reply: FastifyReply) {
        const data = request.body as SearchGymSchema

        await this.searchGymsUseCase.execute(data)

        return reply.status(201).send()
    }
}
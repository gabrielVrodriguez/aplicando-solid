import { FastifyReply, FastifyRequest } from "fastify";
import { FetchNearByGymsUseCase } from "../use-cases/fetch-nearby-gyms";
import { FetchNearbyGymsSchema } from "../dtos/fetch-nearby-gyms";



export class FetchNearbyGymsController {

    constructor (private fetchNearbyGymsUseCase: FetchNearByGymsUseCase) {}

    async handle (request: FastifyRequest, reply: FastifyReply) {

        const data = request.body as FetchNearbyGymsSchema

        await this.fetchNearbyGymsUseCase.execute(data)

        return reply.status(201).send()
    }
}
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateGymUseCase } from "../use-cases/create-gym";
import { CreateGymSchema } from "../dtos/create-gym";



export class CreateGymController {

    constructor (private createGymUseCase: CreateGymUseCase) {}

    async handle (request: FastifyRequest, reply: FastifyReply) {

        const data = request.body as CreateGymSchema

        await this.createGymUseCase.execute(data)

        return reply.status(201).send()
    }
}
import { FastifyReply, FastifyRequest } from "fastify";
import { ValidateCheckInUseCase } from "../use-cases/validate-check-in";
import { ValidateCheckInSchema } from "../dtos/validate-check-in";



export class ValidateCheckInController {
    constructor (private validateCheckInUseCase: ValidateCheckInUseCase) {}

    async handle (request: FastifyRequest, reply: FastifyReply) {

        const data = request.body as ValidateCheckInSchema

        await this.validateCheckInUseCase.execute(data)

        return reply.status(201).send()
    }
}

import { FastifyReply, FastifyRequest } from "fastify";
import { CheckInUseCase } from "../use-cases/check-in";
import { registerCheckinSchema } from "../dtos/register-check-in";



export class RegisterCheckInController {
    constructor (private checkInUseCase: CheckInUseCase) {}

    async handle (request: FastifyRequest, reply: FastifyReply) {

        const data = request.body as registerCheckinSchema

        await this.checkInUseCase.execute(data)

        return reply.status(200).send()
    }
}

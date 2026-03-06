import { FastifyReply, FastifyRequest } from "fastify";
import { CheckInUseCase } from "../use-cases/check-in";
import { registerCheckinSchema } from "../dtos/register-check-in";



export class RegisterCheckInController {
    constructor (private checkInUseCase: CheckInUseCase) {}

    async handle (request: FastifyRequest, reply: FastifyReply) {

        const { gym_id, user_latitude, user_longitude } = request.body as registerCheckinSchema

        const checkIn = await this.checkInUseCase.execute({
            user_id: request.user.sub,
            gym_id,
            user_latitude,
            user_longitude
        })

        return reply.status(201).send(checkIn)
    }
}

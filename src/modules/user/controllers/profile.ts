import { FastifyReply, FastifyRequest } from "fastify"
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id"

export class GetProfileController {

    constructor( private getUserByIdUseCase: GetUserByIdUseCase) {}

    async handle(request: FastifyRequest, reply: FastifyReply) {
      

        try {
          
            const sub = request.user.sub
            const user = await this.getUserByIdUseCase.execute(sub)

            return reply.status(200).send({...user, password_hash: undefined})
        } catch (err) {
            console.error(err)
        }
    }
}
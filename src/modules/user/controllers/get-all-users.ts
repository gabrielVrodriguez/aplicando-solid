import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllUsersUseCase } from "../use-cases/get-all-users";



export class GetAllUsersController {
    constructor(private getAllUsersUseCase: GetAllUsersUseCase) { }

    async handle(request: FastifyRequest, reply: FastifyReply) {
        const users = await this.getAllUsersUseCase.execute()
        return reply.send(users)
    }

}
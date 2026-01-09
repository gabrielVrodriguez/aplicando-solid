import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUseCase } from "../use-cases/register-user";
import { RegisterUserSchema } from "../dtos/register-user";
import { UserAlreadyExistsError } from "../errors/user-already-exists";

export class RegisterController {

  constructor(private registerUseCase: RegisterUseCase) { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    console.log(request.body)
    const data = request.body as RegisterUserSchema

    try {
      await this.registerUseCase.execute(data)
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: error.message })
      }

      throw error
    }
  }
}


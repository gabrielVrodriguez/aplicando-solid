import { FastifyReply, FastifyRequest } from "fastify";
import { AuthenticateUseCase } from "../use-cases/authenticate";
import { AuthenticateSchema } from "../dtos/authenticate";
import { InvalidCredentialError } from "../errors/invalid-credentials";

export class AuthenticateController {

    constructor(private authenticateUseCase: AuthenticateUseCase) { }

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const data = request.body as AuthenticateSchema

        try {
            const { user } = await this.authenticateUseCase.execute(data)
            const userWithoutPassword = { ...user, password_hash: undefined }

            const token = await reply.jwtSign(
                { role: user.role },
                { sign: { sub: user.id } }
            )

            const refreshToken = await reply.jwtSign(
                { role: user.role },
                { sign: { sub: user.id, expiresIn: '7d' } }
            )

            return reply
                .setCookie('refreshToken', refreshToken, {
                    path: '/',
                    secure: true,
                    sameSite: true,
                    httpOnly: true,
                })
                .status(200)
                .send({ token, user: userWithoutPassword })

        } catch (error) {
            if (error instanceof InvalidCredentialError) {
                return reply.status(400).send({ message: error.message })
            }
            throw error
        }
    }
}

import { FastifyReply, FastifyRequest } from "fastify"
import { Role } from "@/shared/entities/user"

export function verifyUserRole(...allowedRoles: Role[]) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const { role } = request.user

        if (!allowedRoles.includes(role)) {
            return reply.status(403).send({ message: 'Forbidden' })
        }
    }
}

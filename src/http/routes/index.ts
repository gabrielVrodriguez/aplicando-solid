import { FastifyInstance, FastifyReply } from "fastify";
import { userRoutes } from "@/modules/user/user.routes";
import { authenticateRoutes } from "@/modules/user/authenticate.routes";

export async function appRoutes(app: FastifyInstance) {
    app.get("/", (request, reply: FastifyReply) => { reply.send("Hello World") })

    
    app.register(userRoutes, { prefix: '/users' })
    app.register(authenticateRoutes, { prefix: '/sessions' })
}
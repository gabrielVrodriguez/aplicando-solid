import { FastifyInstance, FastifyReply } from "fastify";
import { userRoutes } from "@/modules/user/user.routes";
import { authenticateRoutes } from "@/modules/user/authenticate.routes";
import { gymRoutes } from "@/modules/gym/gym.routes";
import { checkInRoutes } from "@/modules/check-in/checkin.routes";

export async function appRoutes(app: FastifyInstance) {
    app.get("/", (request, reply: FastifyReply) => { reply.send("Hello World") })

    
    app.register(userRoutes, { prefix: '/users' })
    app.register(authenticateRoutes, { prefix: '/sessions' })
    app.register(gymRoutes, { prefix: '/gyms' })
    app.register(checkInRoutes, { prefix: '/check-ins' })
    
}
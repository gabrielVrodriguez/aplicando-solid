import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

import { makeCreateGymController } from "./factories/make-create-gym"
import { makeSearchGymsController } from "./factories/make-search-gyms"
import { makeFetchNearbyGymsController } from "./factories/make-fetch-nearby-gyms"

import { createGymDto } from "./dtos/create-gym"
import { searchGymDto } from "./dtos/search-gyms"
import { FetchNearbyGymsDto } from "./dtos/fetch-nearby-gyms"

import { verifyJwt } from "@/middleware/verify-jwt"
import { verifyUserRole } from "@/middleware/verify-user-role"


export async function gymRoutes(app: FastifyInstance) {

    const createGymController = makeCreateGymController()
    const searchGymsController = makeSearchGymsController()
    const fetchNearbyGymsController = makeFetchNearbyGymsController()

    app.addHook('onRequest', verifyJwt)

    app.withTypeProvider<ZodTypeProvider>().post('/', {
        onRequest: [verifyUserRole('ADMIN')],
        schema: {
            body: createGymDto,
        },
    }, (request, reply) => {
        return createGymController.handle(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().get('/search', {
        schema: {
            querystring: searchGymDto,
        },
    }, (request, reply) => {
        return searchGymsController.handle(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().get('/nearby', {
        schema: {
            querystring: FetchNearbyGymsDto,
        },
    }, (request, reply) => {
        return fetchNearbyGymsController.handle(request, reply)
    })
}

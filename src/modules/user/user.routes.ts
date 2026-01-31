import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { registerUserDto } from './dtos/register-user'
import { getUserByIdDto } from './dtos/get-user-by-id'

import { makeRegisterUserController } from './factories/make-register-user'
import { makeGetAllUsersController } from './factories/make-get-all-users'
import { makeGetUserByIdController } from './factories/make-get-user-by-id'
import { makeGetProfileController } from './factories/make-get-profile'

import { verifyJwt } from '@/middleware/verify-jwt'

export async function userRoutes(app: FastifyInstance) {

    const registerController = makeRegisterUserController()
    const getAllUsersController = makeGetAllUsersController()
    const getUserByIdController = makeGetUserByIdController()
    const getProfileController = makeGetProfileController()


    app.get('/', (request, reply) => {
        return getAllUsersController.handle(request, reply)
    })

    app.get('/me', { onRequest: [verifyJwt] }, (request, reply) => {
        return getProfileController.handle(request, reply)
    })


    app.withTypeProvider<ZodTypeProvider>().get('/:id', {
        schema: {
            params: getUserByIdDto,
        },
    }, (request, reply) => {
        return getUserByIdController.handle(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().post('/', {
        schema: {
            body: registerUserDto,
        },
    }, (request, reply) => {
        return registerController.handle(request, reply)
    })


}       
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

import { makeRegisterCheckInController } from "./factories/make-register-check-in"
import { makeFetchUserCheckInsHistoryController } from "./factories/make-fetch-user-check-ins-history"
import { makeGetMetricsByUserIdController } from "./factories/make-get-metrics-by-user-id"
import { makeValidateCheckInController } from "./factories/make-validate-check-in"

import { registerCheckinDto } from "./dtos/register-check-in"
import { validateCheckInDto } from "./dtos/validate-check-in"

import { verifyJwt } from "@/middleware/verify-jwt"
import { verifyUserRole } from "@/middleware/verify-user-role"


export async function checkInRoutes(app: FastifyInstance) {

    const registerCheckInController = makeRegisterCheckInController()
    const fetchUserCheckInsHistoryController = makeFetchUserCheckInsHistoryController()
    const getMetricsByUserIdController = makeGetMetricsByUserIdController()
    const validateCheckInController = makeValidateCheckInController()

    app.addHook('onRequest', verifyJwt)

    app.withTypeProvider<ZodTypeProvider>().post('/', {
        schema: {
            body: registerCheckinDto,
        },
    }, (request, reply) => {
        return registerCheckInController.handle(request, reply)
    })

    app.get('/history', (request, reply) => {
        return fetchUserCheckInsHistoryController.handle(request, reply)
    })

    app.get('/metrics', (request, reply) => {
        return getMetricsByUserIdController.handle(request, reply)
    })

    app.withTypeProvider<ZodTypeProvider>().patch('/:check_in_id/validate', {
        onRequest: [verifyUserRole('ADMIN')],
        schema: {
            params: validateCheckInDto,
        },
    }, (request, reply) => {
        return validateCheckInController.handle(request, reply)
    })
}

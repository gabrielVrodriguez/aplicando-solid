

import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "../use-cases/authenticate";
import { AuthenticateController } from "../controllers/authenticate";




export function makeAuthenticateUseCase() {
    const userRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)
    
    return authenticateUseCase
}

export function makeAuthenticateController() {
    const authenticateUseCase = makeAuthenticateUseCase()
    const authenticateController = new AuthenticateController(authenticateUseCase)

    return authenticateController

}
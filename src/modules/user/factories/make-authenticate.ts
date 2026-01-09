

import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "../use-cases/authenticate";
import { AuthenticateController } from "../controllers/authenticate";

export function makeAuthenticateController() {

    const userRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)
    const authenticateController = new AuthenticateController(authenticateUseCase)

    return authenticateController

}
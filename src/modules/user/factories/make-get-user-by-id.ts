import { GetUserByIdController } from "../controllers/get-user-by-id"
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id"
import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository"



export function makeGetUserByIdUseCase() {
    const userRepository = new PrismaUserRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)
    return getUserByIdUseCase
}

export function makeGetUserByIdController() {
    const getUserByIdUseCase = makeGetUserByIdUseCase()
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
}
import { GetUserByIdController } from "../controllers/get-user-by-id"
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id"
import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository"



export function makeGetUserByIdController() {
    const userRepository = new PrismaUserRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
}
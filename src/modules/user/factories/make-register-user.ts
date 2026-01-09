import { RegisterUseCase } from "../use-cases/register-user";
import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";
import { RegisterController } from "../controllers/register-user";

export function makeRegisterUserController() {
    const userRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)
    const registerController = new RegisterController(registerUseCase)

    return registerController
}
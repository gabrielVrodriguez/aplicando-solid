import { IUserRepository } from "../IUserRepository";
import { prisma } from "../../../../../database/prisma";
import { RegisterUserSchema } from "../../dtos/register-user";

export class PrismaUserRepository implements IUserRepository {

    async create(data: RegisterUserSchema) {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password_hash: data.password
            }
        })

        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }

    async findAll() {
        const users = await prisma.user.findMany()
        return users
    }


}
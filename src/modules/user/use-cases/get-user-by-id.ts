import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "@/shared/entities/user"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found";

export class GetUserByIdUseCase {

    constructor(private userRepository: IUserRepository) { }

    async execute(id: string): Promise<User> {

        const user = await this.userRepository.findById(id)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return user
    }

}


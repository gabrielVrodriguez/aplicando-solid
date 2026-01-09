
import { IGymRepository } from "../repositories/IGymRepository";
import { CreateGymSchema } from "../dtos/create-gym";
import { Gym } from '@/shared/entities/gym'

export class CreateGymUseCase {
    constructor(private gymRepository: IGymRepository) { }

    async execute(data: CreateGymSchema ): Promise<Gym> {

        const { id, title, description, phone, latitude, longitude } = data

    
        const gym = await this.gymRepository.create({ id, title, description, phone, latitude, longitude })

        return gym

    }
}
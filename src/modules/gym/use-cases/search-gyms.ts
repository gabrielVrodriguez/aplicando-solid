import { SearchGymSchema } from "../dtos/search-gyms";
import { IGymRepository } from "../repositories/IGymRepository";
import { Gym } from "@/shared/entities/gym";

export class SearchGymsUseCase {

    constructor(
        private gymRepository: IGymRepository
    ) { }

    async execute({query , page}: SearchGymSchema): Promise<{gyms: Gym[]; total: number}>{
        const gyms = await this.gymRepository.searchMany(query , page)

        return {
            gyms,
            total: gyms.length
        }
    }
}

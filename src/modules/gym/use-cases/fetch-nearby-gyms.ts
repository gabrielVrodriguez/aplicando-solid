
import { FetchNearbyGymsSchema } from "../dtos/fetch-nearby-gyms";
import { IGymRepository } from "../repositories/IGymRepository";



export class FetchNearByGymsUseCase {

    constructor(private gymRepository: IGymRepository) {}
    
    async execute ({latitude, longitude}: FetchNearbyGymsSchema) {
        const gyms = await this.gymRepository.fetchNearbyGyms({latitude, longitude})
        return gyms
    }
}
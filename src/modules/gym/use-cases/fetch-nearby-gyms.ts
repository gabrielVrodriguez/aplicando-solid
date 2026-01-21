
import { fetchNearbyGymsSchema } from "../dtos/fetch-nearby-gyms";
import { IGymRepository } from "../repositories/IGymRepository";



export class FetchNearByGymsUseCase {

    constructor(private gymRepository: IGymRepository) {}
    
    async execute ({latitude, longitude}:  fetchNearbyGymsSchema) {
        const gyms = this.gymRepository.fetchNearbyGyms({latitude, longitude})
        return gyms
    }
}
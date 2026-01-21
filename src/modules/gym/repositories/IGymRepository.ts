
import { Gym } from "@/shared/entities/gym"
import { CreateGymSchema } from "../dtos/create-gym"
import { fetchNearbyGymsSchema } from "../dtos/fetch-nearby-gyms"


export interface IGymRepository {
    findById(id: string): Promise<Gym | null>
    create(data: CreateGymSchema): Promise<Gym>
    searchMany(query: string, page: number): Promise<Gym[]>
    fetchNearbyGyms(params: fetchNearbyGymsSchema): Promise<Gym[]>
}
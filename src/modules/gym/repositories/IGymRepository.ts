
import { Gym } from "@/shared/entities/gym"
import { CreateGymSchema } from "../dtos/create-gym"



export interface IGymRepository {
    findById(id: string): Promise<Gym | null>
    create(data: CreateGymSchema): Promise<Gym>
}
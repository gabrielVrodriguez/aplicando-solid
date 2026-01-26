import { CheckIn } from '@/shared/entities/check-in'
import { registerCheckinSchema } from '../dtos/register-check-in'


export interface ICheckInRepository {
    create(data: registerCheckinSchema): Promise<CheckIn>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[] | null>
    findById(id: string): Promise<CheckIn | null>
    countByUserId(userId: string): Promise<number>
    save(checkIn: CheckIn): Promise<CheckIn>
}
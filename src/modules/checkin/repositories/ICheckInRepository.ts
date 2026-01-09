import { CheckIn } from '@/shared/entities/check-in'
import { registerCheckinSchema } from '../dtos/register-check-in'


export interface ICheckInRepository {
    create(data: registerCheckinSchema): Promise<CheckIn>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    findByUserId(userId: string): Promise<CheckIn[] | null>
}
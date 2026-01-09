import { Checkin } from '@/shared/entities/checkin'
import { registerCheckinSchema } from '../dtos/register-check-in'


export interface ICheckInRepository {
    create(data: registerCheckinSchema): Promise<Checkin>
    findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
}
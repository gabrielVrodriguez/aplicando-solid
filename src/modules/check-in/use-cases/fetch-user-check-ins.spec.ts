import { expect, describe, it, beforeEach, } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-check-in-repository'

import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-ins History Use Case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
    })


    it('should be able to fetch check-in history', async () => {

        await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
            user_latitude: -23.947202,
            user_longitude: -46.3336866,
        })

        await checkInRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
            user_latitude: -23.947202,
            user_longitude: -46.3336866,
        })

        const checkIns = await sut.execute({ user_id: 'user-01' })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' })])

    })

    it('should be able to fetch paginated check-in history', async () => {

        for (let i = 1; i <= 22; i++) {
            await checkInRepository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01',
                user_latitude: -23.947202,
                user_longitude: -46.3336866,
            })
        }


        const checkIns = await sut.execute({ user_id: 'user-01', page: 2 })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-21' }),
            expect.objectContaining({ gym_id: 'gym-22' })])

    })
})

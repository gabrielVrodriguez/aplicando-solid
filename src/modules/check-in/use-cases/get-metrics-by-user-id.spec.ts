import { expect, describe, it, beforeEach, } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-check-in-repository'
import { GetMetricsByUserIdUseCase } from './get-metrics-by-user-id'

let checkInRepository: InMemoryCheckInRepository
let sut: GetMetricsByUserIdUseCase

describe('Get metrics by user id Use Case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new GetMetricsByUserIdUseCase(checkInRepository)
    })


    it('should be able to get check-ins count  by user id from metrics', async () => {

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

        const checkInsCount = await sut.execute({ user_id: 'user-01' })

        expect(checkInsCount).toBe(2)
    })

    it('should not be able to get check-ins count  by user id from metrics', async () => {
        await expect(() => sut.execute({ user_id: 'user-01' })).rejects.toThrow()

    })

})

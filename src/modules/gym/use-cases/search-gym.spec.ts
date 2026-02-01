import { expect, describe, it, beforeEach, } from 'vitest'

import { InMemoryGymRepository } from '../repositories/in-memory/in-memory-gym-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

describe('Search gyms Use Case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository()
        sut = new SearchGymsUseCase(gymRepository)
    })


    it('should be able to search gyms', async () => {

        await gymRepository.create({
            title: 'Gym 01',
            description: 'Gym 01',
            phone: 'Gym 01',
            latitude: -23.947202,
            longitude: -46.3336866,
        })

        await gymRepository.create({
            title: 'Gym 02',
            description: 'Gym 02',
            phone: 'Gym 02',
            latitude: -23.947202,
            longitude: -46.3336866,
        })

        const gym = await sut.execute({ query: 'Gym', page: 1 })

        expect(gym.gyms).toHaveLength(2)
        expect(gym.total).toBe(2)
        expect(gym.gyms).toEqual([
            expect.objectContaining({ title: 'Gym 01' }),
            expect.objectContaining({ title: 'Gym 02' })])




    })

    it('should be able to search paginated gyms', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymRepository.create({
                id: `gym-${i}`,
                title: `Gym ${i}`,
                description: `Gym ${i}`,
                phone: `Gym ${i}`,
                latitude: -23.947202,
                longitude: -46.3336866,
            })
        }

        const gyms1 = await sut.execute({ query: 'Gym', page: 1 })

        const gyms2 = await sut.execute({ query: 'Gym', page: 2 })

        expect(gyms2.gyms).toHaveLength(2)
        expect(gyms2.total).toBe(2)
        expect(gyms2.gyms).toEqual([
            expect.objectContaining({ title: 'Gym 21' }),
            expect.objectContaining({ title: 'Gym 22' })])

        expect(gyms1.gyms).toHaveLength(20)
        expect(gyms1.total).toBe(20)

    })
})

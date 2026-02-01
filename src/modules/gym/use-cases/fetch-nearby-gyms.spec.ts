import { expect, describe, it, beforeEach, } from 'vitest'

import { InMemoryGymRepository } from '../repositories/in-memory/in-memory-gym-repository'
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms'

let gymRepository: InMemoryGymRepository
let sut: FetchNearByGymsUseCase

describe('Fetch nearby gyms Use Case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository()
        sut = new FetchNearByGymsUseCase(gymRepository)
    })


    it('should be able to fetch nearby gyms', async () => {

        await gymRepository.create({
            title: 'Gym 01',
            description: 'Gym 01',
            phone: 'Gym 01',
            latitude: -29.947202,
            longitude: -900.3336866,
        })

        await gymRepository.create({
            title: 'Gym 02',
            description: 'Gym 02',
            phone: 'Gym 02',
            latitude: -23.947202,
            longitude: -46.3336866,
        })

        const gyms = await sut.execute({ latitude: -23.947202, longitude: -46.3336866 })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'Gym 02' })])

    })


})


import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id'
import { ResourceNotFoundError } from '../../../shared/errors/resource-not-found'



describe('Get user by id Use Case', () => {



    let userRepository: InMemoryUserRepository
    let sut: GetUserByIdUseCase

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new GetUserByIdUseCase(userRepository)
    })

    it('should be able to get user by id', async () => {


        const createdUser = await userRepository.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456'
        })

        const user = await sut.execute(createdUser.id)

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual(createdUser.name)
    })

    it('should not be able to get user by id that does not exist', async () => {

        await expect(() => sut.execute('123')).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
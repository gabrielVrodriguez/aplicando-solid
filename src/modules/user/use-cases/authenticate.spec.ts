import { describe, it, expect, beforeEach } from "vitest";
import bcrypt from 'bcrypt'

import { AuthenticateUseCase } from "./authenticate";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { InvalidCredentialError } from "../errors/invalid-credentials";


describe('Authenticate use case', () => {

    let userRepository: InMemoryUserRepository
    let sut: AuthenticateUseCase

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new AuthenticateUseCase(userRepository)
    })

    it('should be able to authenticate', async () => {

        await userRepository.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: await bcrypt.hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'john.doe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {

        expect(async () => {
            await sut.execute({
                email: 'john@example.com',
                password: '123456'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialError)
    })


    it('should not be able to authenticate with wrong password', async () => {

        await userRepository.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: await bcrypt.hash('123456', 6)
        })

        expect(async () => {
            await sut.execute({
                email: 'john.doe@example.com',
                password: '1234567'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialError)
    })
})
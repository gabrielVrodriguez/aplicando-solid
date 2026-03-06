import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'

describe('Authenticate (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate', async () => {
        await request(app.server).post('/users/').send({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456',
        })

        const response = await request(app.server).post('/sessions/').send({
            email: 'john.doe@example.com',
            password: '123456',
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(
            expect.objectContaining({ token: expect.any(String) })
        )
    })

    it('should return a refresh token cookie on authenticate', async () => {
        await request(app.server).post('/users/').send({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: '123456',
        })

        const response = await request(app.server).post('/sessions/').send({
            email: 'jane.doe@example.com',
            password: '123456',
        })

        expect(response.statusCode).toEqual(200)
        expect(response.headers['set-cookie']).toBeDefined()
        expect(response.headers['set-cookie']![0]).toContain('refreshToken')
    })

    it('should not authenticate with wrong credentials', async () => {
        const response = await request(app.server).post('/sessions/').send({
            email: 'nonexistent@example.com',
            password: 'wrongpassword',
        })

        expect(response.statusCode).toEqual(400)
    })
})

import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'

describe('Refresh Token (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to refresh a token', async () => {
        await request(app.server).post('/users/').send({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456',
        })

        const authResponse = await request(app.server).post('/sessions/').send({
            email: 'john.doe@example.com',
            password: '123456',
        })

        const cookies = authResponse.get('Set-Cookie')

        const response = await request(app.server)
            .patch('/sessions/refresh')
            .set('Cookie', cookies!)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(
            expect.objectContaining({ token: expect.any(String) })
        )
        expect(response.headers['set-cookie']).toBeDefined()
        expect(response.headers['set-cookie'][0]).toContain('refreshToken')
    })

    it('should not refresh without a cookie', async () => {
        const response = await request(app.server)
            .patch('/sessions/refresh')
            .send()

        expect(response.statusCode).toEqual(401)
    })
})

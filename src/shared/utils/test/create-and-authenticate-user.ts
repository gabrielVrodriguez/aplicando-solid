import request from 'supertest'
import { app } from '@/app'

export async function createAndAuthenticateUser(
    role: 'ADMIN' | 'MEMBER' = 'MEMBER'
) {
    await request(app.server).post('/users/').send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
        role,
    })

    const authResponse = await request(app.server).post('/sessions/').send({
        email: 'john.doe@example.com',
        password: '123456',
    })

    const { token } = authResponse.body
    const cookies = authResponse.headers['set-cookie']

    return { token, cookies }
}

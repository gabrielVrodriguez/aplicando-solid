import { describe, it, expect, vi } from 'vitest'
import { verifyUserRole } from './verify-user-role'
import { FastifyReply, FastifyRequest } from 'fastify'

function createMockRequest(role: 'ADMIN' | 'MEMBER') {
    return {
        user: { sub: 'user-01', role },
    } as unknown as FastifyRequest
}

function createMockReply() {
    const reply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn().mockReturnThis(),
    }
    return reply as unknown as FastifyReply
}

describe('verifyUserRole middleware', () => {
    it('should allow access when user has the required role', async () => {
        const middleware = verifyUserRole('ADMIN')
        const request = createMockRequest('ADMIN')
        const reply = createMockReply()

        await middleware(request, reply)

        expect((reply as any).status).not.toHaveBeenCalled()
    })

    it('should deny access when user does not have the required role', async () => {
        const middleware = verifyUserRole('ADMIN')
        const request = createMockRequest('MEMBER')
        const reply = createMockReply()

        await middleware(request, reply)

        expect((reply as any).status).toHaveBeenCalledWith(403)
        expect((reply as any).send).toHaveBeenCalledWith({ message: 'Forbidden' })
    })

    it('should allow access when user has one of multiple allowed roles', async () => {
        const middleware = verifyUserRole('ADMIN', 'MEMBER')
        const request = createMockRequest('MEMBER')
        const reply = createMockReply()

        await middleware(request, reply)

        expect((reply as any).status).not.toHaveBeenCalled()
    })
})

import { RefreshTokenController } from "../controllers/refresh-token"

export function makeRefreshTokenController() {
    const refreshTokenController = new RefreshTokenController()
    return refreshTokenController
}

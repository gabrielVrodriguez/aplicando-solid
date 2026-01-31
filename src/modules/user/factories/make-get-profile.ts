import { GetProfileController } from "../controllers/profile"
import { makeGetUserByIdUseCase } from "./make-get-user-by-id"


export function makeGetProfileController() {
    const getUserByIdUseCase = makeGetUserByIdUseCase()
    const getProfileController = new GetProfileController(getUserByIdUseCase)
    return getProfileController
}
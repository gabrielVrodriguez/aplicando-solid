import { ICheckInRepository } from "../repositories/ICheckInRepository";
import { registerCheckinSchema } from "../dtos/register-check-in";
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found";
import { IGymRepository } from "@/modules/gym/repositories/IGymRepository";
import { getDistanceBetweenCoordinates } from "@/shared/utils/get-distance-between-coordinate";
import { MaxDistanceError } from "../errors/max-distance";
import { MaxNumberCheckInsError } from "../errors/max-number-check-ins";

export class CheckinUseCase {

    constructor(
        private checkinRepository: ICheckInRepository,
        private gymRepository: IGymRepository
    ) { }

    async execute({ user_id, gym_id, user_latitude, user_longitude }: registerCheckinSchema) {
        const gym = await this.gymRepository.findById(gym_id)
        const MAX_DISTANCE_IN_KM = 0.1

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            { latitude: user_latitude, longitude: user_longitude },
            { latitude: gym.latitude, longitude: gym.longitude }
        )

        if (distance > MAX_DISTANCE_IN_KM) {
            throw new MaxDistanceError()
        }

        const checkinOnSameDay = await this.checkinRepository.findByUserIdOnDate(user_id, new Date())

        if (checkinOnSameDay) {
            throw new MaxNumberCheckInsError()
        }

        const checkin = await this.checkinRepository.create({ gym_id, user_id, user_latitude, user_longitude })



        return checkin
    }
}
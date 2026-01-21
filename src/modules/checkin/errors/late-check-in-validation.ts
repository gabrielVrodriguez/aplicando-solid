

export class LateCheckInValidationError extends Error {
    constructor() {
        super('Check-in validation must be done within 20 minutes of its creation')

        this.name = 'LateCheckInValidationError'
    }


}
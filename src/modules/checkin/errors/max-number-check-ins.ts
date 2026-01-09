

export class MaxNumberCheckInsError extends Error {
    constructor() {
        super('Max number of check-ins reached')

        this.name = 'Max number of check-ins reached'
    }
}
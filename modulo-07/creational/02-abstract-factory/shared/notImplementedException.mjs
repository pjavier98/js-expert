export default class NotImplementationException extends Error {
    constructor(message) {
        super(`The "${message}" function was not implemented`);
        this.name = "NotImplementationException"
    }
}
import {HttpException, HttpStatus} from "@nestjs/common";

export class InvalidBirthdateException extends HttpException {
    constructor() {
        super("Invalid birth date format", HttpStatus.BAD_REQUEST);
    }
}
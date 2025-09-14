import {HttpException, HttpStatus} from "@nestjs/common";

export class DoctorNotFoundException extends HttpException {
    constructor() {
        super("Doctor not found", HttpStatus.NOT_FOUND);
    }
}